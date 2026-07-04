/** @format */

import { useReducer, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Save, Eye, ArrowLeft, Globe, Sparkles, Grip } from "lucide-react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import formReducer from "../features/form-builder/utils/formReducer";
import SortableField from "../features/form-builder/components/SortableField";
import {
  publishForm,
  saveFormFields,
  updateFormTitle,
} from "../features/form-builder/services/formsService";
import useFormFields from "../features/form-builder/hooks/useFormFields";
import useForms from "../features/form-builder/hooks/useForms";
import Spinner from "../ui/components/Spinner";
import useAuth from "../features/Auth/useAuth";

const initialState = { title: "", fields: [] };

function FormBuilderPage() {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { formId } = useParams();
  const { data: formsList } = useForms();
  const {
    data: fieldsData,
    isLoading: fieldsLoading,
    isFetched: fieldsFetched,
  } = useFormFields(formId);
  const queryClient = useQueryClient();

  const draftKey = `form-draft-${formId}`;
  const savedSnapshot = useRef(null);

  const [state, dispatch] = useReducer(formReducer, initialState);
  const { fields, title } = state;
  const [publishedUrl, setPublishedUrl] = useState(null);

  const formData = formsList?.find((f) => f.id === formId);

  // لود Draft از localStorage (اولین بار)
  useEffect(() => {
    if (!formId) return;
    const key = `form-draft-${formId}`;
    const draft = localStorage.getItem(key);
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        dispatch({ type: "LOAD_FORM", payload: parsed });
        savedSnapshot.current = parsed;
      } catch {}
    }
  }, [formId]);

  // ذخیره خودکار Draft با Debounce 500ms
  const saveDraftTimer = useRef(null);
  useEffect(() => {
    if (!formId) return;
    clearTimeout(saveDraftTimer.current);
    saveDraftTimer.current = setTimeout(() => {
      localStorage.setItem(draftKey, JSON.stringify(state));
    }, 500);
    return () => clearTimeout(saveDraftTimer.current);
  }, [state, formId, draftKey]);

  // بارگذاری از سرور فقط اگر Draft نبود
  useEffect(() => {
    if (!formId || !fieldsFetched || !formData) return;
    const draft = localStorage.getItem(draftKey);
    if (!draft && fields.length === 0) {
      const loaded = { title: formData.title, fields: fieldsData || [] };
      dispatch({ type: "LOAD_FORM", payload: loaded });
      savedSnapshot.current = loaded;
    }
  }, [formId, fieldsFetched, formData]);

  // لینک عمومی
  useEffect(() => {
    if (formData?.public_id) {
      setPublishedUrl(`${window.location.origin}/form/${formData.public_id}`);
    } else {
      setPublishedUrl(null);
    }
  }, [formData?.public_id]);

  // موقع خروج از Builder، کش داشبورد رو با Draft آپدیت کن
  useEffect(() => {
    return () => {
      const draft = localStorage.getItem(draftKey);
      if (draft) {
        try {
          const parsed = JSON.parse(draft);
          if (parsed.title && parsed.title !== formData?.title) {
            queryClient.setQueryData(["forms", user.id], (old) =>
              old?.map((f) =>
                f.id === formId ? { ...f, title: parsed.title } : f,
              ),
            );
          }
        } catch {}
      }
    };
  }, [draftKey, formId, formData?.title, user.id, queryClient]);

  function addField(e) {
    if (e.target.value === "Add Field...") return;
    dispatch({ type: "ADD_FIELD", payload: { type: e.target.value } });
    e.target.value = "Add Field...";
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = fields.findIndex((f) => f.id === active.id);
    const newIndex = fields.findIndex((f) => f.id === over.id);
    dispatch({
      type: "REORDER_FIELDS",
      payload: { fromIndex: oldIndex, toIndex: newIndex },
    });
  }

  function validateFields() {
    for (const field of fields) {
      if (!field.label?.trim()) {
        toast.error("All fields must have a label");
        return false;
      }
      if (field.type === "multiple_choice") {
        const validOptions = field.options?.filter((opt) => opt?.trim());
        if (!validOptions?.length) {
          toast.error(`"${field.label}" must have at least one option`);
          return false;
        }
      }
    }
    return true;
  }

  async function handleSave() {
    if (!validateFields()) return;
    setIsSaving(true);
    try {
      await saveFormFields(formId, fields);
      await updateFormTitle(formId, title);
      queryClient.setQueryData(["forms", user.id], (old) =>
        old?.map((f) => (f.id === formId ? { ...f, title } : f)),
      );
      queryClient.invalidateQueries({ queryKey: ["forms", user.id] });
      savedSnapshot.current = { title, fields };
      localStorage.removeItem(draftKey);
      toast.success("Form saved successfully!");
    } catch {
      toast.error("Failed to save form. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handlePublish() {
    setIsPublishing(true);
    try {
      const publicId = await publishForm(formId);
      queryClient.setQueryData(["forms", user.id], (old) =>
        old?.map((f) =>
          f.id === formId
            ? { ...f, is_published: true, public_id: publicId }
            : f,
        ),
      );
      localStorage.removeItem(draftKey);
      setPublishedUrl(`${window.location.origin}/form/${publicId}`);
      toast.success("Form published successfully!");
    } catch {
      toast.error("Failed to publish form.");
    } finally {
      setIsPublishing(false);
    }
  }

  const isDirty =
    !savedSnapshot.current ||
    JSON.stringify({ title, fields }) !== JSON.stringify(savedSnapshot.current);

  const canPublish = fields.length > 0 && !isDirty;

  if (fieldsLoading && formId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50/30">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/20">
      <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <button
              onClick={() => window.history.back()}
              className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="h-5 w-px bg-gray-200 hidden sm:block flex-shrink-0" />
            <input
              type="text"
              placeholder="Untitled Form"
              value={title}
              onChange={(e) =>
                dispatch({
                  type: "SET_TITLE",
                  payload: { title: e.target.value },
                })
              }
              className="text-base sm:text-lg font-semibold text-gray-900 border-none outline-none bg-transparent placeholder:text-gray-300 min-w-0 w-full focus:ring-0"
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="lg:hidden p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || !isDirty}
              title={!isDirty ? "No changes to save" : "Save your form"}
              className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-medium w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-2 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline sm:ml-1.5">
                {isSaving ? "Saving..." : "Save"}
              </span>
            </button>
            <button
              disabled={isPublishing || !canPublish}
              onClick={handlePublish}
              title={
                fields.length === 0
                  ? "Add at least one field"
                  : isDirty
                    ? "Save before publishing"
                    : "Publish your form"
              }
              className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-2 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline sm:ml-1.5">
                {isPublishing ? "Publishing..." : "Publish"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {publishedUrl && (
        <div className="bg-emerald-50 border-b border-emerald-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-emerald-700">
              <Globe className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium">Your form is live at:</span>
              <a
                href={publishedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-800 underline underline-offset-2 hover:text-emerald-900 font-medium break-all"
              >
                {publishedUrl}
              </a>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(publishedUrl);
                  toast.success("Link copied to clipboard!");
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-emerald-300 text-emerald-700 text-xs font-medium rounded-lg hover:bg-emerald-100 transition-colors"
              >
                Copy Link
              </button>
              <button
                onClick={() => setPublishedUrl(null)}
                className="p-1.5 text-emerald-400 hover:text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
              >
                <span className="sr-only">Dismiss</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row h-[calc(100vh-3.5rem)]">
        <div
          className={`${
            showPreview ? "hidden lg:flex" : "flex"
          } flex-1 flex-col bg-white lg:border-r border-gray-100`}
        >
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {fields.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                  <Sparkles className="w-12 h-12 text-indigo-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Start Building
                </h3>
                <p className="text-sm text-gray-500 max-w-xs mb-8 leading-relaxed">
                  Add your first field from the options below. Drag and drop to
                  reorder them anytime.
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Grip className="w-3.5 h-3.5" />
                  <span>Drag fields to reorder</span>
                </div>
              </div>
            ) : (
              <DndContext onDragEnd={handleDragEnd}>
                <SortableContext items={fields.map((f) => f.id)}>
                  <div className="space-y-2 pb-4">
                    {fields.map((item) => (
                      <SortableField
                        key={item.id}
                        field={item}
                        dispatch={dispatch}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
          <div className="sticky bottom-0 bg-white/80 backdrop-blur-md border-t border-gray-100 p-4 lg:p-6">
            <select
              onChange={(e) => addField(e)}
              className="w-full appearance-none bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-300 hover:border-indigo-400 rounded-xl px-5 py-3.5 text-sm font-medium text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            >
              <option value="Add Field...">+ Add Field...</option>
              <option value="short_text">📝 Short Text</option>
              <option value="long_text">📄 Long Text</option>
              <option value="multiple_choice">☑️ Multiple Choice</option>
            </select>
          </div>
        </div>

        <div
          className={`${
            showPreview ? "flex" : "hidden lg:flex"
          } flex-1 flex-col bg-gray-50/50 overflow-y-auto p-4 sm:p-6 lg:p-8`}
        >
          <div className="max-w-lg mx-auto w-full">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Eye className="w-4 h-4 text-indigo-500" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-700">
                  Live Preview
                </h2>
                <p className="text-xs text-gray-400">
                  See what your audience will see
                </p>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {title || "Untitled Form"}
              </h1>
              {title && (
                <p className="text-sm text-gray-400 mb-6">
                  Please fill out this form.
                </p>
              )}
              {fields.length > 0 && <div className="h-px bg-gray-50 my-6" />}
              <div className="space-y-6">
                {fields.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Eye className="w-8 h-8 text-gray-200" />
                    </div>
                    <p className="text-sm text-gray-400">
                      Add fields to see the preview
                    </p>
                  </div>
                ) : (
                  fields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {field.label || "Untitled Field"}
                      </label>
                      {field.type === "short_text" && (
                        <input
                          type="text"
                          disabled
                          placeholder="Short text answer"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 text-gray-400 text-sm"
                        />
                      )}
                      {field.type === "long_text" && (
                        <textarea
                          disabled
                          rows={3}
                          placeholder="Long text answer"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 text-gray-400 text-sm resize-none"
                        />
                      )}
                      {field.type === "multiple_choice" && (
                        <div className="space-y-2">
                          {field.options
                            ?.filter((opt) => opt && opt.trim() !== "")
                            .map((opt, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl"
                              >
                                <div className="w-4 h-4 rounded-full border-2 border-gray-200 flex-shrink-0" />
                                <span className="text-sm text-gray-500">
                                  {opt}
                                </span>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
              {fields.length > 0 && (
                <div className="mt-8">
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-indigo-100">
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormBuilderPage;

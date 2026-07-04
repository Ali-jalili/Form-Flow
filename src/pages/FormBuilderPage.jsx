/** @format */

import { useReducer, useEffect, useRef, useState } from "react";
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
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [lastSavedSnapshot, setLastSavedSnapshot] = useState(null);
  const [hasUserSaved, setHasUserSaved] = useState(false);
  const { formId } = useParams();
  const { data: formsList } = useForms();
  const {
    data: fieldsData,
    isLoading: fieldsLoading,
    isFetching: fieldsFetching,
    isFetched: fieldsFetched,
  } = useFormFields(formId);
  const queryClient = useQueryClient();
  const { fields, title } = state;
  const hasLoadedRef = useRef(false);
  const [publishedUrl, setPublishedUrl] = useState(null);

  const formData = formsList?.find((f) => f.id === formId);

  useEffect(() => {
    hasLoadedRef.current = false;
    setHasUserSaved(false);
  }, [formId]);

  useEffect(() => {
    if (!formId) return;
    if (!fieldsFetched || fieldsFetching || !formData || hasLoadedRef.current)
      return;

    dispatch({
      type: "LOAD_FORM",
      payload: { title: formData.title, fields: fieldsData || [] },
    });
    setLastSavedSnapshot({ title: formData.title, fields: fieldsData || [] });
    setHasUserSaved(true);
    hasLoadedRef.current = true;
  }, [fieldsData, fieldsFetched, fieldsFetching, formData, formId]);

  useEffect(() => {
    if (formData?.public_id) {
      setPublishedUrl(`${window.location.origin}/form/${formData.public_id}`);
    } else {
      setPublishedUrl(null);
    }
  }, [formData?.public_id]);

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

  async function handleSave() {
    setIsSaving(true);
    try {
      await saveFormFields(formId, fields);
      await updateFormTitle(formId, title);
      setLastSavedSnapshot({ title, fields });
      setHasUserSaved(true);
      queryClient.invalidateQueries({ queryKey: ["forms", user.id] });
      queryClient.invalidateQueries({ queryKey: ["form_fields", formId] });
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
      const url = `${window.location.origin}/form/${publicId}`;
      setPublishedUrl(url); // لینک کامل رو ذخیره کن
      toast.success("Form published successfully!");
      queryClient.invalidateQueries({ queryKey: ["forms", user.id] });
    } catch {
      toast.error("Failed to publish form.");
    } finally {
      setIsPublishing(false);
    }
  }

  const isDirty =
    !lastSavedSnapshot ||
    JSON.stringify(fields) !== JSON.stringify(lastSavedSnapshot.fields) ||
    title !== lastSavedSnapshot.title;

  const getPublishButtonStatus = () => {
    if (fields.length === 0) {
      return {
        disabled: true,
        tooltip: "Add at least one field to publish",
      };
    }
    if (isDirty) {
      return {
        disabled: true,
        tooltip: "Save your changes before publishing",
      };
    }
    if (!hasUserSaved) {
      return {
        disabled: true,
        tooltip: "Save your form first",
      };
    }
    return {
      disabled: false,
      tooltip: "Publish your form to make it live",
    };
  };

  const publishStatus = getPublishButtonStatus();

  if (fieldsLoading && formId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50/30">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/20">
      {/* Top Bar */}
      <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-2">
          {/* Left */}
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

          {/* Right */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Mobile Preview Toggle */}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="lg:hidden p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
            >
              <Eye className="w-5 h-5" />
            </button>

            {/* Save */}
            <button
              onClick={handleSave}
              disabled={isSaving || !isDirty}
              title={!isDirty ? "No changes to save" : "Save your form"}
              className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-medium w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-2 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline sm:ml-1.5">
                {isSaving ? "Saving..." : "Save"}
              </span>
            </button>

            {/* Publish */}
            <button
              disabled={isPublishing || publishStatus.disabled}
              onClick={handlePublish}
              title={publishStatus.tooltip}
              className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-2 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600"
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row h-[calc(100vh-3.5rem)]">
        {/* Editor */}
        <div
          className={`${
            showPreview ? "hidden lg:flex" : "flex"
          } flex-1 flex-col bg-white lg:border-r border-gray-100`}
        >
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {/* Empty State */}
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

          {/* Bottom Add Field Bar */}
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

        {/* Preview */}
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
              {/* Form Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {title || "Untitled Form"}
              </h1>
              {title && (
                <p className="text-sm text-gray-400 mb-6">
                  Please fill out this form.
                </p>
              )}

              {fields.length > 0 && <div className="h-px bg-gray-50 my-6" />}

              {/* Form Fields */}
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
                        {field.required && (
                          <span className="text-rose-500 ml-1">*</span>
                        )}
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
                          {field.options?.map((opt, i) => (
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

              {/* Submit Button */}
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

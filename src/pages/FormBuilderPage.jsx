/** @format */

import { useReducer, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Plus, Save, Eye, ArrowLeft } from "lucide-react";
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
import { Globe } from "lucide-react";

const initialState = { title: "", fields: [] };

function FormBuilderPage() {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { formId } = useParams();
  const { data: formsList } = useForms();
  const { data: fieldsData, isLoading: fieldsLoading } = useFormFields(formId);
  const queryClient = useQueryClient();
  const { fields, title } = state;

  const formData = formsList?.find((f) => f.id === formId);

  function addField(e) {
    if (e.target.value === "Add Field...") return;
    dispatch({ type: "ADD_FIELD", payload: { type: e.target.value } });
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
      queryClient.invalidateQueries({ queryKey: ["forms", user.id] });
      toast.success("Form saved successfully!");
    } catch {
      toast.error("Failed to save form. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  useEffect(() => {
    if (fieldsData && formData) {
      dispatch({
        type: "LOAD_FORM",
        payload: { title: formData.title, fields: fieldsData },
      });
    }
  }, [fieldsData, formData]);

  if (fieldsLoading && formId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner />
      </div>
    );
  }

  async function handlePublish() {
    setIsPublishing(true);
    try {
      const publicId = await publishForm(formId);

      toast.success(`Form published! Link: /form/${publicId}`);
      queryClient.invalidateQueries({ queryKey: ["forms", user.id] });
    } catch {
      toast.error("Failed to publish form.");
    } finally {
      setIsPublishing(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30">
      {/* Top Bar */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
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
              className="text-lg font-semibold text-gray-900 border-none outline-none bg-transparent placeholder:text-gray-300 w-64"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Preview Toggle */}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Eye className="w-5 h-5" />
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save"}
            </button>

            <button
              disabled={isPublishing}
              onClick={handlePublish}
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md text-sm"
            >
              <Globe className="w-4 h-4" />
              Publish
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row h-[calc(100vh-3.5rem)]">
        {/* Editor */}
        <div
          className={`${
            showPreview ? "hidden lg:flex" : "flex"
          } flex-1 flex-col bg-white lg:border-r border-gray-200`}
        >
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {/* Empty State */}
            {fields.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Plus className="w-10 h-10 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Start Building Your Form
                </h3>
                <p className="text-sm text-gray-500 max-w-sm mb-8">
                  Add fields below to create your form. Drag and drop to reorder
                  them.
                </p>
              </div>
            ) : (
              <DndContext onDragEnd={handleDragEnd}>
                <SortableContext items={fields.map((f) => f.id)}>
                  <div className="space-y-2">
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
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 lg:p-6">
            <div className="relative">
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
        </div>

        {/* Preview */}
        <div
          className={`${
            showPreview ? "flex" : "hidden lg:flex"
          } flex-1 flex-col bg-gray-50/80 overflow-y-auto p-4 sm:p-6 lg:p-8`}
        >
          <div className="max-w-lg mx-auto w-full">
            <div className="flex items-center gap-2 mb-6">
              <Eye className="w-4 h-4 text-gray-400" />
              <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                Live Preview
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 sm:p-8">
              {/* Form Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {title || "Untitled Form"}
              </h1>
              <p className="text-sm text-gray-400 mb-6">
                Please fill out this form.
              </p>

              <div className="h-px bg-gray-100 my-6" />

              {/* Form Fields */}
              <div className="space-y-6">
                {fields.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Eye className="w-6 h-6 text-gray-300" />
                    </div>
                    <p className="text-sm text-gray-400">
                      Add fields to see the preview
                    </p>
                  </div>
                ) : (
                  fields.map((field) => (
                    <div key={field.id} className="space-y-2 group">
                      <label className="block text-sm font-medium text-gray-700">
                        {field.label || "Untitled Field"}
                        {field.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </label>

                      {field.type === "short_text" && (
                        <input
                          type="text"
                          disabled
                          placeholder="Short text answer"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-sm transition-colors group-hover:border-gray-300"
                        />
                      )}
                      {field.type === "long_text" && (
                        <textarea
                          disabled
                          rows={3}
                          placeholder="Long text answer"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-sm resize-none transition-colors group-hover:border-gray-300"
                        />
                      )}

                      {field.type === "multiple_choice" && (
                        <div className="space-y-2">
                          {field.options?.map((opt, i) => (
                            <label
                              key={i}
                              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-colors"
                            >
                              <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0" />
                              <span className="text-sm text-gray-500">
                                {opt}
                              </span>
                            </label>
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
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm">
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

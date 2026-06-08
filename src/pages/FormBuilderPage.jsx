/** @format */

import { useReducer } from "react";
import formReducer from "../features/form-builder/utils/formReducer";
import { Plus } from "lucide-react";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import SortableField from "../features/form-builder/components/SortableField";

const initialState = {
  title: "Untitled Form",
  fields: [],
};

function FormBuilderPage() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const { fields, title } = state;

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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Editor - Left */}
      <div className="w-1/2 border-r border-gray-200 bg-white p-6 overflow-y-auto">
        {/* Title */}
        <div className="mb-8">
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
            className="w-full text-3xl font-bold text-gray-900 border-none outline-none placeholder:text-gray-300 bg-transparent"
          />
        </div>

        {/* Fields */}
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={fields.map((f) => f.id)}>
            {fields.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-indigo-500" />
                </div>
                <p className="text-gray-500 text-sm">
                  No fields yet. Add your first field below.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {fields.map((item) => (
                  <SortableField
                    key={item.id}
                    field={item}
                    dispatch={dispatch}
                  />
                ))}
              </div>
            )}
          </SortableContext>
        </DndContext>

        {/* Add Field */}
        <div className="mt-6 border-t border-gray-100 pt-6">
          <select
            onChange={(e) => addField(e)}
            className="w-full appearance-none bg-white border border-gray-300 hover:border-indigo-400 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          >
            <option value="Add Field...">+ Add Field...</option>
            <option value="short_text">Short Text</option>
            <option value="long_text">Long Text</option>
            <option value="multiple_choice">Multiple Choice</option>
          </select>
        </div>
      </div>

      {/* Preview - Right */}
      <div className="w-1/2 bg-gray-50 p-6 overflow-y-auto">
        <div className="max-w-lg mx-auto">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-6">
            Preview
          </h2>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {title || "Untitled Form"}
            </h1>

            <div className="h-px bg-gray-200 my-6" />

            <div className="space-y-6">
              {fields.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-12">
                  Preview will appear here...
                </p>
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
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-400 text-sm"
                      />
                    )}
                    {field.type === "long_text" && (
                      <textarea
                        disabled
                        rows={3}
                        placeholder="Long text answer"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-400 text-sm resize-none"
                      />
                    )}
                    {field.type === "multiple_choice" && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                          Option 1
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                          Option 2
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormBuilderPage;

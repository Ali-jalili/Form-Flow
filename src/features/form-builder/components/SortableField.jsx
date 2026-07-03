/** @format */

import { useSortable } from "@dnd-kit/sortable";
import { GripVertical, Trash2, Circle, X } from "lucide-react";

function SortableField({ field, dispatch }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id });

  const style = {
    transform: `translateY(${transform?.y ?? 0}px)`,
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="group flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all duration-200"
    >
      {/* Drag Handle */}
      <div
        {...listeners}
        className="mt-1.5 text-gray-300 group-hover:text-indigo-400 cursor-grab active:cursor-grabbing transition-colors p-0.5"
      >
        <GripVertical className="w-5 h-5" />
      </div>

      {/* Field Content */}
      <div className="flex-1 space-y-3">
        {/* Label Input */}
        <input
          placeholder="Enter field label..."
          type="text"
          value={field.label}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              payload: {
                id: field.id,
                changes: { label: e.target.value },
              },
            })
          }
          className="w-full text-base font-medium text-gray-800 border-none outline-none placeholder:text-gray-400 bg-transparent p-0"
        />

        {/* Type Badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-block text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
            {field.type === "short_text"
              ? "📝 Short Text"
              : field.type === "long_text"
                ? "📄 Long Text"
                : "☑️ Multiple Choice"}
          </span>
        </div>

        {/* Multiple Choice Options */}
        {field.type === "multiple_choice" && (
          <div className="space-y-2 pl-1">
            {field.options?.map((opt, i) => (
              <div key={i} className="flex items-center gap-2.5 group/opt">
                <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />
                <span className="text-sm text-gray-600 flex-1">{opt}</span>
                <button
                  onClick={() => {
                    const newOptions = field.options.filter(
                      (_, idx) => idx !== i,
                    );
                    dispatch({
                      type: "UPDATE_FIELD",
                      payload: {
                        id: field.id,
                        changes: { options: newOptions },
                      },
                    });
                  }}
                  className="text-gray-300 hover:text-rose-500 opacity-0 group-hover/opt:opacity-100 transition-all p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newOptions = [...(field.options || []), "New Option"];
                dispatch({
                  type: "UPDATE_FIELD",
                  payload: { id: field.id, changes: { options: newOptions } },
                });
              }}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-medium mt-1 flex items-center gap-1"
            >
              <span className="text-base leading-none">+</span> Add Option
            </button>
          </div>
        )}
      </div>

      {/* Delete */}
      <button
        onClick={() =>
          dispatch({ type: "DELETE_FIELD", payload: { id: field.id } })
        }
        className="mt-1 text-gray-300 hover:text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

export default SortableField;

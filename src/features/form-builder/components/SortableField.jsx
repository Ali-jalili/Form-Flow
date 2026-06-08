/** @format */

import { useSortable } from "@dnd-kit/sortable";
import { GripVertical, Trash2 } from "lucide-react";

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
      className="group flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-sm transition-all duration-200"
    >
      {/* Drag Handle */}
      <div
        {...listeners}
        className="mt-2 text-gray-300 group-hover:text-gray-500 cursor-grab transition-colors"
      >
        <GripVertical className="w-5 h-5" />
      </div>

      {/* Field Content */}
      <div className="flex-1 space-y-2">
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
          className="w-full text-base font-medium text-gray-800 border-none outline-none placeholder:text-gray-400 bg-transparent"
        />
        <span className="inline-block text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
          {field.type === "short_text"
            ? "Short Text"
            : field.type === "long_text"
              ? "Long Text"
              : "Multiple Choice"}
        </span>
      </div>

      {/* Delete */}
      <button
        onClick={() =>
          dispatch({ type: "DELETE_FIELD", payload: { id: field.id } })
        }
        className="mt-1 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

export default SortableField;

/** @format */

import { useSortable } from "@dnd-kit/sortable";
import { Circle, GripVertical, Trash2, X, Plus } from "lucide-react";
import { useController } from "react-hook-form";

function SortableField({ field, index, control, remove }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: field.id,
    });

  const labelField = useController({
    name: `fields.${index}.label`,
    control,
  });

  const requiredField = useController({
    name: `fields.${index}.required`,
    control,
  });

  const optionsField = useController({
    name: `fields.${index}.options`,
    control,
  });

  const style = {
    transform: `translateY(${transform?.y ?? 0}px)`,
    transition,
  };

  function handleOptionChange(optionIndex, value) {
    const options = [...(optionsField.field.value || [])];

    options[optionIndex] = value;

    optionsField.field.onChange(options);
  }

  function handleRemoveOption(optionIndex) {
    const options = (optionsField.field.value || []).filter(
      (_, currentIndex) => currentIndex !== optionIndex,
    );

    optionsField.field.onChange(options);
  }

  function handleAddOption() {
    const options = optionsField.field.value || [];
    const lastOption = options[options.length - 1];

    if (lastOption?.trim() === "") return;

    optionsField.field.onChange([...options, ""]);
  }

  const fieldTypeLabel = {
    short_text: "Short text",
    long_text: "Long text",
    multiple_choice: "Multiple choice",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-indigo-200 hover:shadow-md sm:p-5"
    >
      <div className="flex items-start gap-3">
        {/* Drag Handle */}
        <button
          type="button"
          {...attributes}
          {...listeners}
          aria-label="Drag field"
          className="mt-1.5 cursor-grab rounded-lg p-1 text-gray-300 transition-colors hover:bg-gray-50 hover:text-indigo-400 active:cursor-grabbing"
        >
          <GripVertical className="h-5 w-5" />
        </button>

        {/* Main Content */}
        <div className="min-w-0 flex-1">
          {/* Field Header */}
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-indigo-50 px-2 py-1 text-[11px] font-semibold text-indigo-600">
                {index + 1}
              </span>

              <span className="text-xs font-medium text-gray-500">
                {fieldTypeLabel[field.type] || "Field"}
              </span>
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              aria-label="Delete field"
              className="rounded-lg p-1.5 text-gray-300 opacity-0 transition-all hover:bg-rose-50 hover:text-rose-500 group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Label */}
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-medium text-gray-500">
              Question
            </label>

            <input
              type="text"
              placeholder="Enter your question..."
              {...labelField.field}
              className="w-full rounded-lg border-0 bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-800 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-indigo-500 placeholder:text-gray-400"
            />
          </div>

          {/* Required */}
          <label className="mb-4 flex w-fit cursor-pointer items-center gap-2 text-xs text-gray-500">
            <input
              type="checkbox"
              checked={requiredField.field.value || false}
              onChange={(event) =>
                requiredField.field.onChange(event.target.checked)
              }
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />

            <span>Required</span>
          </label>

          {/* Multiple Choice Options */}
          {field.type === "multiple_choice" && (
            <div className="border-t border-gray-100 pt-4">
              <div className="mb-2 text-xs font-medium text-gray-500">
                Answer options
              </div>

              <div className="space-y-2">
                {(optionsField.field.value || []).map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="group/option flex items-center gap-2"
                  >
                    <Circle className="h-4 w-4 flex-shrink-0 text-gray-300" />

                    <input
                      type="text"
                      value={option}
                      onChange={(event) =>
                        handleOptionChange(optionIndex, event.target.value)
                      }
                      placeholder={`Option ${optionIndex + 1}`}
                      className="min-w-0 flex-1 border-0 bg-transparent py-1.5 text-sm text-gray-600 outline-none placeholder:text-gray-300 focus:text-gray-900"
                    />

                    <button
                      type="button"
                      onClick={() => handleRemoveOption(optionIndex)}
                      aria-label={`Remove option ${optionIndex + 1}`}
                      className="rounded-md p-1 text-gray-300 opacity-0 transition-all hover:bg-rose-50 hover:text-rose-500 group-hover/option:opacity-100"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddOption}
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-indigo-600 transition-colors hover:bg-indigo-50 hover:text-indigo-700"
              >
                <Plus className="h-3.5 w-3.5" />
                Add option
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SortableField;

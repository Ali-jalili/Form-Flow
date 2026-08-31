/** @format */

import { useSortable } from "@dnd-kit/sortable";
import { Circle, GripVertical, Trash2, X, Plus, Asterisk } from "lucide-react";
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
    short_text: "Short answer",
    long_text: "Long answer",
    multiple_choice: "Multiple choice",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:border-indigo-200 hover:shadow-md"
    >
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <div className="flex items-start gap-3 p-4 sm:p-5">
        {/* Drag Handle */}
        <button
          type="button"
          {...attributes}
          {...listeners}
          aria-label="Drag field"
          title="Drag to reorder"
          className="mt-1.5 flex h-8 w-8 flex-shrink-0 cursor-grab items-center justify-center rounded-lg text-gray-300 transition-all hover:bg-indigo-50 hover:text-indigo-500 active:cursor-grabbing active:bg-indigo-100"
        >
          <GripVertical className="h-5 w-5" />
        </button>

        {/* Main Content */}
        <div className="min-w-0 flex-1">
          {/* Header */}
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 min-w-7 items-center justify-center rounded-lg bg-indigo-50 px-2 text-xs font-bold text-indigo-600">
                {index + 1}
              </span>

              <span className="rounded-full bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-500">
                {fieldTypeLabel[field.type] || "Field"}
              </span>
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              aria-label="Delete field"
              title="Delete field"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-300 transition-all hover:bg-rose-50 hover:text-rose-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Question */}
          <div className="mb-5">
            <label
              htmlFor={`field-${field.id}`}
              className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-gray-600"
            >
              Question
              {requiredField.field.value && (
                <Asterisk className="h-3 w-3 text-rose-500" />
              )}
            </label>

            <input
              id={`field-${field.id}`}
              type="text"
              placeholder="What would you like to ask?"
              {...labelField.field}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3 text-sm font-medium text-gray-800 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          {/* Required */}
          <label className="group/required inline-flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-gray-500 transition-colors hover:bg-gray-50">
            <input
              type="checkbox"
              checked={requiredField.field.value || false}
              onChange={(event) =>
                requiredField.field.onChange(event.target.checked)
              }
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />

            <span className="font-medium">Required question</span>
          </label>

          {/* Multiple Choice */}
          {field.type === "multiple_choice" && (
            <div className="mt-5 border-t border-gray-100 pt-5">
              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-600">
                  Answer options
                </p>

                <p className="mt-0.5 text-[11px] text-gray-400">
                  Add the choices people can select from.
                </p>
              </div>

              <div className="space-y-1.5">
                {(optionsField.field.value || []).map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="group/option flex items-center gap-2 rounded-lg px-2 py-1 transition-colors hover:bg-gray-50"
                  >
                    <Circle className="h-4 w-4 flex-shrink-0 text-gray-300" />

                    <input
                      type="text"
                      value={option}
                      onChange={(event) =>
                        handleOptionChange(optionIndex, event.target.value)
                      }
                      placeholder={`Option ${optionIndex + 1}`}
                      className="min-w-0 flex-1 border-0 bg-transparent py-2 text-sm text-gray-700 outline-none placeholder:text-gray-300 focus:text-gray-900"
                    />

                    <button
                      type="button"
                      onClick={() => handleRemoveOption(optionIndex)}
                      aria-label={`Remove option ${optionIndex + 1}`}
                      title="Remove option"
                      className="flex h-7 w-7 items-center justify-center rounded-md text-gray-300 opacity-0 transition-all hover:bg-rose-50 hover:text-rose-500 group-hover/option:opacity-100"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Option */}
              <button
                type="button"
                onClick={handleAddOption}
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-indigo-600 transition-all hover:bg-indigo-50 hover:text-indigo-700"
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

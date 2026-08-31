/** @format */

import { Circle } from "lucide-react";

function FormPreviewField({ field }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {field.label || "Untitled Field"}
        {field.required && (
          <span className="ml-1 text-rose-500" aria-label="required">
            *
          </span>
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
          rows={4}
          placeholder="Long text answer"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 text-gray-400 text-sm resize-none"
        />
      )}

      {field.type === "multiple_choice" && (
        <div className="space-y-2">
          {field.options
            ?.filter((option) => option?.trim())
            .map((option, index) => (
              <div
                key={`${field.id}-${index}`}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl"
              >
                <Circle
                  className="w-4 h-4 text-gray-300 flex-shrink-0"
                  aria-hidden="true"
                />

                <span className="text-sm text-gray-500">{option}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default FormPreviewField;

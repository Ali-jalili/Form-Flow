/** @format */

import { Eye } from "lucide-react";
import { useWatch } from "react-hook-form";

import FormPreviewField from "./FormPreviewField";

function FormPreview() {
  const { title, fields = [] } = useWatch();

  return (
    <div className="flex-1 flex-col bg-gray-50/50 overflow-y-auto p-4 sm:p-6 lg:p-8">
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
                <FormPreviewField key={field.id} field={field} />
              ))
            )}
          </div>

          {fields.length > 0 && (
            <div className="mt-8">
              <button
                type="button"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-indigo-100"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormPreview;

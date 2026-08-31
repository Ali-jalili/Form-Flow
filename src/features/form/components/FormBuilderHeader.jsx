/** @format */

import { ArrowLeft, Eye, Globe, Save } from "lucide-react";

function FormBuilderHeader({
  title,
  onTitleChange,
  onBack,
  onPreviewToggle,
  onSave,
  onPublish,
  isSaving,
  isPublishing,
  isDirty,
  canPublish,
}) {
  return (
    <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <button
            onClick={onBack}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="h-5 w-px bg-gray-200 hidden sm:block flex-shrink-0" />

          <input
            type="text"
            placeholder="Untitled Form"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            className="text-base sm:text-lg font-semibold text-gray-900 border-none outline-none bg-transparent placeholder:text-gray-300 min-w-0 w-full focus:ring-0"
          />
        </div>

        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <button
            onClick={onPreviewToggle}
            className="lg:hidden p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
          >
            <Eye className="w-5 h-5" />
          </button>

          <button
            onClick={onSave}
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
            onClick={onPublish}
            title={
              !canPublish
                ? "Save your form before publishing"
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
  );
}

export default FormBuilderHeader;

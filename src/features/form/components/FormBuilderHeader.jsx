/** @format */

import { ArrowLeft, Check, Eye, Globe, Loader2, Save } from "lucide-react";

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
    <header className="sticky top-0 z-20 border-b border-gray-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-3 sm:px-6">
        {/* Left */}
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          {/* Back */}
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back"
            title="Go back"
            className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 active:scale-95"
          >
            <ArrowLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
          </button>

          <div className="hidden h-7 w-px bg-gray-200 sm:block" />

          {/* Form title */}
          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-2">
              <input
                type="text"
                value={title}
                onChange={(event) => onTitleChange(event.target.value)}
                placeholder="Untitled Form"
                aria-label="Form title"
                className="min-w-0 w-full max-w-sm truncate rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-sm font-semibold text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-200 hover:bg-white focus:border-indigo-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 sm:text-base"
              />

              {/* Save status */}
              <div className="hidden shrink-0 items-center gap-1.5 text-xs sm:flex">
                {isDirty ? (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span className="text-gray-400">Unsaved</span>
                  </>
                ) : (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-gray-400">Saved</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Preview */}
          <button
            type="button"
            onClick={onPreviewToggle}
            aria-label="Preview form"
            title="Preview form"
            className="group flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-gray-500 transition-all duration-200 hover:border-gray-200 hover:bg-gray-50 hover:text-gray-900 active:scale-95 lg:hidden"
          >
            <Eye className="h-4.5 w-4.5 transition-transform duration-200 group-hover:scale-105" />
          </button>

          {/* Save */}
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving || !isDirty}
            title={!isDirty ? "No changes to save" : "Save your form"}
            className="group inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 sm:h-10"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4 transition-transform duration-200 group-hover:scale-105" />
            )}

            <span className="hidden sm:inline">
              {isSaving ? "Saving..." : "Save"}
            </span>
          </button>

          {/* Publish */}
          <button
            type="button"
            onClick={onPublish}
            disabled={isPublishing || !canPublish}
            title={
              !canPublish
                ? "Save your form before publishing"
                : "Publish your form"
            }
            className="group inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-3 text-sm font-semibold text-white shadow-md shadow-indigo-200/60 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 sm:h-10 sm:px-4"
          >
            {isPublishing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Globe className="h-4 w-4 transition-transform duration-200 group-hover:scale-105" />
            )}

            <span className="hidden sm:inline">
              {isPublishing ? "Publishing..." : "Publish"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default FormBuilderHeader;

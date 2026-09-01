/** @format */

import { Eye, Radio, Sparkles } from "lucide-react";

import { useWatch } from "react-hook-form";

import FormPreviewField from "./FormPreviewField";

function FormPreview() {
  const { title, fields = [] } = useWatch();

  return (
    <section className="flex min-w-0 flex-1 flex-col overflow-hidden bg-slate-50">
      {/* Preview Header */}
      <div className="shrink-0 border-b border-gray-200/80 bg-white/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Eye className="h-4.5 w-4.5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-gray-800">
                  Live Preview
                </h2>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>

              <p className="mt-0.5 truncate text-xs text-gray-400">
                See what your audience will see
              </p>
            </div>
          </div>

          <div className="hidden shrink-0 items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1.5 text-[11px] font-medium text-gray-400 sm:flex">
            <Sparkles className="h-3.5 w-3.5" />
            Auto-updating
          </div>
        </div>
      </div>

      {/* Preview Canvas */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-lg">
          {/* Browser-like frame */}
          <div className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-xl shadow-gray-200/40">
            {/* Browser top bar */}
            <div className="flex h-10 items-center gap-1.5 border-b border-gray-100 bg-gray-50/80 px-4">
              <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />

              <div className="ml-3 flex h-6 flex-1 items-center rounded-md bg-white px-3">
                <span className="truncate text-[10px] text-gray-300">
                  your-form.com
                </span>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 sm:p-8">
              {/* Form Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  {title || "Untitled Form"}
                </h1>

                {title ? (
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Please fill out this form.
                  </p>
                ) : (
                  <p className="mt-2 text-sm leading-6 text-gray-300">
                    Your form title will appear here.
                  </p>
                )}
              </div>

              {fields.length > 0 && <div className="mb-7 h-px bg-gray-100" />}

              {/* Fields */}
              {fields.length === 0 ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                  <div className="relative mb-5">
                    <div className="absolute inset-0 scale-125 rounded-2xl bg-indigo-50 blur-xl" />

                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-purple-50">
                      <Eye className="h-7 w-7 text-indigo-300" />
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-gray-700">
                    Your form is waiting
                  </h3>

                  <p className="mt-1.5 max-w-xs text-xs leading-5 text-gray-400">
                    Add fields from the builder to see your form come to life
                    here.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {fields.map((field) => (
                    <FormPreviewField key={field.id} field={field} />
                  ))}
                </div>
              )}

              {/* Submit */}
              {fields.length > 0 && (
                <div className="mt-9 border-t border-gray-100 pt-6">
                  <button
                    type="button"
                    className="
                      group
                      flex w-full items-center justify-center gap-2
                      rounded-xl
                      bg-indigo-600
                      px-4 py-3
                      text-sm font-semibold text-white
                      shadow-lg shadow-indigo-200/60
                      transition-all duration-200
                      hover:-translate-y-0.5
                      hover:bg-indigo-700
                      hover:shadow-xl hover:shadow-indigo-200
                      active:translate-y-0
                      focus:outline-none
                      focus:ring-2 focus:ring-indigo-500
                      focus:ring-offset-2
                    "
                  >
                    Submit
                    <Radio className="h-4 w-4 transition-transform group-hover:scale-110" />
                  </button>

                  <p className="mt-3 text-center text-[11px] text-gray-300">
                    This is a preview — submissions are disabled.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Preview hint */}
          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-gray-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Changes appear instantly in the preview
          </div>
        </div>
      </div>
    </section>
  );
}

export default FormPreview;

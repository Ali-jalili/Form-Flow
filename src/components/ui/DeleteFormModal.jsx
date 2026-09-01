/** @format */

import { AlertTriangle, X, Loader2 } from "lucide-react";

function DeleteFormModal({
  isOpen,
  formTitle,
  isDeleting,
  onClose,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-form-title"
        className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-50">
              <AlertTriangle className="h-5 w-5 text-rose-500" />
            </div>

            <div>
              <h2
                id="delete-form-title"
                className="font-semibold text-gray-900"
              >
                Delete form?
              </h2>

              <p className="mt-0.5 text-xs text-gray-400">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            aria-label="Close"
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Message */}
        <div className="mt-5 rounded-xl bg-gray-50 px-4 py-3">
          <p className="text-sm text-gray-600">
            You are about to permanently delete{" "}
            <span className="font-semibold text-gray-900">"{formTitle}"</span>.
          </p>

          <p className="mt-1 text-xs text-gray-400">
            All fields and associated data will be removed.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}

            {isDeleting ? "Deleting..." : "Delete form"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteFormModal;

/** @format */

import { CheckCircle2, Copy, ExternalLink, Globe2, X } from "lucide-react";
import toast from "react-hot-toast";

function PublishedFormBanner({ publishedUrl, onDismiss }) {
  if (!publishedUrl) return null;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(publishedUrl);
      toast.success("Link copied!");
    } catch {
      toast.error("Failed to copy link.");
    }
  }

  return (
    <div className="border-b border-emerald-200/80 bg-gradient-to-r from-emerald-50 via-white to-emerald-50">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        {/* Success Icon */}
        <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 sm:flex">
          <CheckCircle2 className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Globe2 className="h-4 w-4 shrink-0 text-emerald-600 sm:hidden" />

            <p className="text-sm font-semibold text-emerald-900">
              Your form is live 🎉
            </p>
          </div>

          <div className="mt-1 flex min-w-0 items-center gap-2">
            <span className="hidden text-xs text-emerald-700 sm:inline">
              Share it with anyone:
            </span>

            <a
              href={publishedUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={publishedUrl}
              className="min-w-0 truncate text-xs font-medium text-emerald-700 underline decoration-emerald-300 underline-offset-2 transition-colors hover:text-emerald-900 hover:decoration-emerald-500"
            >
              {publishedUrl}
            </a>
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={handleCopy}
            title="Copy link"
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 text-xs font-semibold text-emerald-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            <Copy className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Copy</span>
          </button>

          <a
            href={publishedUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open published form"
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-emerald-600 px-3 text-xs font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Open</span>
          </a>

          <button
            type="button"
            onClick={onDismiss}
            title="Dismiss"
            aria-label="Dismiss published form banner"
            className="ml-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg text-emerald-500 transition-colors hover:bg-emerald-100 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PublishedFormBanner;

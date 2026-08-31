/** @format */

import { Globe, X } from "lucide-react";
import toast from "react-hot-toast";

function PublishedFormBanner({ publishedUrl, onDismiss }) {
  if (!publishedUrl) return null;

  function handleCopy() {
    navigator.clipboard.writeText(publishedUrl);
    toast.success("Link copied to clipboard!");
  }

  return (
    <div className="bg-emerald-50 border-b border-emerald-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-emerald-700">
          <Globe className="w-4 h-4 flex-shrink-0" />

          <span className="font-medium">Your form is live at:</span>

          <a
            href={publishedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-800 underline underline-offset-2 hover:text-emerald-900 font-medium break-all"
          >
            {publishedUrl}
          </a>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-emerald-300 text-emerald-700 text-xs font-medium rounded-lg hover:bg-emerald-100 transition-colors"
          >
            Copy Link
          </button>

          <button
            onClick={onDismiss}
            className="p-1.5 text-emerald-400 hover:text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PublishedFormBanner;

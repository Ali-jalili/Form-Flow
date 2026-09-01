/** @format */

import { Link } from "react-router-dom";
import { FileQuestion, ArrowLeft } from "lucide-react";

function NotFoundPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-50/60 px-4 py-12 overflow-hidden">
      {/* Ambient Glow Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute left-1/3 top-1/3 h-48 w-48 rounded-full bg-purple-500/10 blur-2xl" />
      </div>

      <div className="relative w-full max-w-md text-center">
        {/* Main Card Wrap */}
        <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-8 sm:p-10 shadow-xl shadow-slate-200/50 backdrop-blur-md">
          {/* Icon Header */}
          <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 animate-pulse rounded-2xl bg-indigo-100/60" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-indigo-100 bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50 shadow-sm">
              <FileQuestion className="h-10 w-10 text-indigo-600" />
            </div>
          </div>

          {/* 404 Badge */}
          <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-indigo-600 ring-1 ring-indigo-500/10 mb-3">
            Error 404
          </span>

          {/* Heading & Typography */}
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl mb-2">
            Page not found
          </h1>

          <p className="text-xs leading-relaxed text-slate-500 sm:text-sm max-w-xs mx-auto mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            might have been moved, deleted, or never existed.
          </p>

          {/* Action Button */}
          <Link
            to="/"
            className="
              group
              inline-flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-indigo-600
              px-6
              py-3
              text-xs
              font-semibold
              text-white
              shadow-lg
              shadow-indigo-200
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-indigo-700
              hover:shadow-xl
              hover:shadow-indigo-300
              active:scale-[0.98]
              sm:w-auto
            "
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Footer Support Text */}
        <p className="mt-6 text-[11px] font-medium text-slate-400">
          Need help? Feel free to contact support.
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;

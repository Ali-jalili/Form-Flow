/** @format */

import { useNavigate } from "react-router-dom";
import { ArrowRight, FilePlus, Sparkles, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

import useCreateForm from "../hooks/useCreateForm";

function EmptyState() {
  const navigate = useNavigate();
  const { mutateAsync: createForm, isPending } = useCreateForm();

  async function handleCreateForm() {
    try {
      const newForm = await createForm();
      navigate(`/builder/${newForm.id}`);
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="relative my-6 flex min-h-[520px] w-full items-center justify-center overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-md sm:p-12">
      {/* Decorative Glow Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute left-1/3 top-1/4 h-32 w-32 rounded-full bg-purple-500/10 blur-2xl" />

        {/* Floating Ambient Dots */}
        <div className="absolute left-[15%] top-[20%] h-2 w-2 animate-pulse rounded-full bg-indigo-400" />
        <div className="absolute right-[18%] top-[25%] h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400 [animation-delay:500ms]" />
        <div className="absolute bottom-[25%] left-[22%] h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-300 [animation-delay:1000ms]" />
      </div>

      {/* Main Content Box */}
      <div className="relative w-full max-w-md text-center">
        {/* Icon Container with Glassmorphism */}
        <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-2xl bg-indigo-100/50 opacity-75 [animation-duration:3s]" />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-indigo-100/80 bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50 shadow-md shadow-indigo-100/50">
            <FilePlus className="h-9 w-9 text-indigo-600" />

            <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-indigo-600 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-2.5">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
            Workspace Ready
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Build your first form
          </h2>

          <p className="mx-auto max-w-sm text-xs leading-relaxed text-slate-500 sm:text-sm">
            Create custom interactive forms, collect responses instantly, and
            analyze data—all in one streamlined workspace.
          </p>
        </div>

        {/* Call To Action */}
        <div className="mt-8">
          <button
            type="button"
            disabled={isPending}
            onClick={handleCreateForm}
            className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200/80 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-300/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
          >
            {isPending ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                <span>Creating form...</span>
              </>
            ) : (
              <>
                <span>Create your first form</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>

        {/* Features Checklist */}
        <div className="mt-6 flex items-center justify-center gap-4 text-[11px] font-medium text-slate-400">
          <span className="flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
            No setup needed
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
            Instant publishing
          </span>
        </div>
      </div>
    </div>
  );
}

export default EmptyState;

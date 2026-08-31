/** @format */

import { useNavigate } from "react-router-dom";
import { ArrowRight, FilePlus, Sparkles } from "lucide-react";
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
    <div className="relative flex min-h-[65vh] items-center justify-center overflow-hidden px-4 py-12 sm:px-6">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-100/40 blur-3xl" />

        <div className="absolute left-[15%] top-[20%] h-2 w-2 animate-pulse rounded-full bg-indigo-300" />

        <div className="absolute right-[18%] top-[30%] h-1.5 w-1.5 animate-pulse rounded-full bg-purple-300 [animation-delay:500ms]" />

        <div className="absolute bottom-[20%] left-[25%] h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-200 [animation-delay:1000ms]" />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-lg text-center">
        {/* Icon */}
        <div className="relative mx-auto mb-7 flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 animate-pulse rounded-2xl bg-indigo-100/70" />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-sm">
            <FilePlus className="h-9 w-9 text-indigo-600" />

            <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-indigo-600">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
            Your workspace is ready
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Let&apos;s build your first form
          </h2>

          <p className="mx-auto max-w-md text-sm leading-6 text-gray-500 sm:text-base">
            Create a beautiful form, collect responses, and turn your ideas into
            something people can interact with.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <button
            type="button"
            disabled={isPending}
            onClick={handleCreateForm}
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {isPending ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Creating form...
              </>
            ) : (
              <>
                Create your first form
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>

        {/* Supporting hint */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          No setup required
          <span className="text-gray-300">•</span>
          Start in seconds
        </div>
      </div>
    </div>
  );
}

export default EmptyState;

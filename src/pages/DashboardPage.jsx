/** @format */

import { useState } from "react";
import useForms from "../features/form/hooks/useForms";
import ErrorMessage from "../components/ui/ErrorMessage";
import Spinner from "../components/ui/Spinner";
import EmptyState from "../features/form/components/EmptyState";
import FormsList from "../features/form/components/FormsList";
import useAuth from "../features/Auth/useAuth";
import { FileText, CheckCircle2, Clock } from "lucide-react";

function DashboardPage() {
  const { data, isLoading, error } = useForms();
  const { user } = useAuth();

  const [isNewUser] = useState(() => {
    if (!user?.created_at) return false;
    const createdAt = new Date(user.created_at).getTime();
    const now = Date.now();
    return now - createdAt < 2 * 60 * 1000;
  });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const firstName = user?.user_metadata?.name || "there";

  const totalForms = data?.length || 0;
  const publishedCount = data?.filter((f) => f.is_published).length || 0;
  const draftCount = totalForms - publishedCount;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {isNewUser
                ? `Welcome, ${firstName}! 🎉`
                : `Welcome back, ${firstName}! 😃`}
            </h1>
            <p className="mt-1.5 text-xs text-slate-500 sm:text-sm">
              Manage your forms, track responses, and analyze metrics in one
              place.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        {totalForms > 0 && (
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Total Forms Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600 transition-transform duration-200 group-hover:scale-105">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Total Forms
                  </p>
                  <p className="mt-0.5 text-2xl font-bold text-slate-900">
                    {totalForms}
                  </p>
                </div>
              </div>
            </div>

            {/* Published Forms Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600 transition-transform duration-200 group-hover:scale-105">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Published
                  </p>
                  <p className="mt-0.5 text-2xl font-bold text-slate-900">
                    {publishedCount}
                  </p>
                </div>
              </div>
            </div>

            {/* Drafts Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-100 bg-amber-50 text-amber-600 transition-transform duration-200 group-hover:scale-105">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Drafts
                  </p>
                  <p className="mt-0.5 text-2xl font-bold text-slate-900">
                    {draftCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Forms Content */}
        {totalForms === 0 ? <EmptyState /> : <FormsList data={data} />}
      </div>
    </div>
  );
}

export default DashboardPage;

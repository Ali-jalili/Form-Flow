/** @format */

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

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const userName = user?.user_metadata?.name || "there";

  // محاسبه آمار فرم‌ها
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
              Welcome back, {userName} 👋
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Manage your forms, track responses, and analyze metrics in one
              place.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        {totalForms > 0 && (
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">
                  Total Forms
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {totalForms}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">Published</p>
                <p className="text-2xl font-bold text-slate-900">
                  {publishedCount}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">Drafts</p>
                <p className="text-2xl font-bold text-slate-900">
                  {draftCount}
                </p>
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

/** @format */

import { Link } from "react-router-dom";
import useForms from "../features/form-builder/hooks/useForms";
import Spinner from "../ui/Spinner";
import ErrorMessage from "../ui/components/ErrorMessage";
import FormCard from "../features/form-builder/components/FormCard";
import EmptyState from "../ui/components/EmptyState";

function DashboardPage() {
  const { data, isLoading, error } = useForms();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (data.length === 0) return <EmptyState />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Forms</h2>
        <Link
          to="/builder/new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
        >
          + New Form
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <FormCard key={item.id} dataForm={item} />
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;

/** @format */

import { Link } from "react-router-dom";
import useForms from "../features/form-builder/hooks/useForms";
import Spinner from "../ui/Spinner";
import ErrorMessage from "../ui/components/ErrorMessage";
import FormCard from "../features/form-builder/components/FormCard";

function DashboardPage() {
  const { data, isLoading, error } = useForms();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (data.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl text-gray-400">+</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          No forms yet
        </h2>
        <p className="text-sm text-gray-500 mb-6 max-w-sm">
          Create your first form and start collecting responses
        </p>
        <Link
          to="/builder/new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors inline-block"
        >
          Create New Form
        </Link>
      </div>
    );

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

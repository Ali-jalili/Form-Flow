/** @format */

import FormCard from "../../features/form-builder/components/FormCard";
import useAuth from "../../features/Auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { createForm } from "../../features/form-builder/services/formsService";
import Spinner from "../components/Spinner";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, FileText } from "lucide-react";

function FormsList({ data }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreateForm() {
    setIsLoading(true);
    try {
      const newForm = await createForm(user.id);
      queryClient.invalidateQueries({ queryKey: ["forms", user.id] });
      navigate(`/builder/${newForm.id}`);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message || "Something went wrong");
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Forms</h2>
            <p className="text-sm text-gray-500">
              {data.length} {data.length === 1 ? "form" : "forms"} total
            </p>
          </div>
        </div>

        <button
          disabled={isLoading}
          onClick={handleCreateForm}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          New Form
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item) => (
          <FormCard key={item.id} dataForm={item} />
        ))}
      </div>
    </div>
  );
}

export default FormsList;

/** @format */

import FormCard from "../../features/form-builder/components/FormCard";
import useAuth from "../../features/Auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import createForm from "../../features/form-builder/services/formsService";
import Spinner from "../Spinner";

function FormsList({ data }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreateForm() {
    setIsLoading(true);

    try {
      const newForm = await createForm(user.id);
      navigate(`/builder/${newForm.id}`);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message || "Something went wrong");
    }
  }
  if (isLoading) return <Spinner />;
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Forms</h2>
        <button
          disabled={isLoading}
          onClick={handleCreateForm}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
        >
          + New Form
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <FormCard key={item.id} dataForm={item} />
        ))}
      </div>
    </div>
  );
}

export default FormsList;

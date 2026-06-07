/** @format */

import { useNavigate } from "react-router-dom";
import useAuth from "../../features/Auth/useAuth";
import createForm from "../../features/form-builder/services/formsService";
import { useState } from "react";
import Spinner from "../Spinner";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

function EmptyState() {
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
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl text-gray-400">+</span>
      </div>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">No forms yet</h2>
      <p className="text-sm text-gray-500 mb-6 max-w-sm">
        Create your first form and start collecting responses
      </p>
      <button
        disabled={isLoading}
        onClick={handleCreateForm}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors inline-block"
      >
        Create New Form
      </button>
    </div>
  );
}

export default EmptyState;

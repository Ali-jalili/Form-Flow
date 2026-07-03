/** @format */

import { useNavigate } from "react-router-dom";
import useAuth from "../../features/Auth/useAuth";
import { createForm } from "../../features/form-builder/services/formsService";
import { useState } from "react";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { FilePlus, ArrowRight } from "lucide-react";

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
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 py-12">
      {/* Icon */}
      <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
        <FilePlus className="w-10 h-10 text-indigo-600" />
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Let's build your first form
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-8 max-w-sm leading-relaxed">
        You haven&apos;t created any forms yet. Start building one now, and
        share it with the world in minutes.
      </p>

      {/* CTA Button */}
      <button
        disabled={isLoading}
        onClick={handleCreateForm}
        className="group inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Create Your First Form
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Subtle Hint */}
      <p className="text-xs text-gray-400 mt-6">
        It only takes a few seconds to get started.
      </p>
    </div>
  );
}

export default EmptyState;

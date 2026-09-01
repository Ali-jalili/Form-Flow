/** @format */

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { Plus, FileText, ArrowRight, Loader2 } from "lucide-react";

import useAuth from "../../Auth/useAuth";

import { createForm } from "../services/formsService";

import FormCard from "./FormCard";

function FormsList({ data }) {
  const { user } = useAuth();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [isCreating, setIsCreating] = useState(false);

  async function handleCreateForm() {
    if (isCreating) return;

    setIsCreating(true);

    try {
      const newForm = await createForm(user.id);

      await queryClient.invalidateQueries({
        queryKey: ["forms", user.id],
      });

      navigate(`/builder/${newForm.id}`);
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
      setIsCreating(false);
    }
  }

  const formCount = data.length;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
              <FileText className="h-5 w-5 text-indigo-600" />
            </div>

            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
              {formCount} {formCount === 1 ? "form" : "forms"}
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            My Forms
          </h1>

          <p className="mt-1.5 text-sm text-gray-500">
            Create, manage, and publish your forms.
          </p>
        </div>

        {/* New Form */}
        <button
          type="button"
          onClick={handleCreateForm}
          disabled={isCreating}
          className="
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-indigo-600
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-indigo-200
            transition-all
            duration-200
            hover:bg-indigo-700
            hover:shadow-xl
            hover:shadow-indigo-200
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:opacity-60
            sm:w-auto
          "
        >
          {isCreating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              New Form
            </>
          )}
        </button>
      </div>

      {/* Empty State */}
      {formCount === 0 && (
        <div
          className="
            flex
            min-h-[360px]
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-gray-200
            bg-white/60
            px-6
            text-center
          "
        >
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
            <FileText className="h-7 w-7 text-indigo-500" />
          </div>

          <h2 className="text-lg font-semibold text-gray-900">No forms yet</h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
            Create your first form and start collecting responses.
          </p>

          <button
            type="button"
            onClick={handleCreateForm}
            disabled={isCreating}
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-indigo-600
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              transition-colors
              hover:bg-indigo-700
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <Plus className="h-4 w-4" />
            Create your first form
          </button>
        </div>
      )}

      {/* Forms Grid */}
      {formCount > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <FormCard key={item.id} dataForm={item} />
          ))}
        </div>
      )}

      {/* Footer hint */}
      {formCount > 0 && (
        <div className="mt-8 flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <span>Manage your forms from here</span>
          <ArrowRight className="h-3 w-3" />
        </div>
      )}
    </div>
  );
}

export default FormsList;

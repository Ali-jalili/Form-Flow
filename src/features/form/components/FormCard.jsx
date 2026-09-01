/** @format */

import { Link, useNavigate } from "react-router-dom";

import DeleteFormModal from "../../../components/ui/DeleteFormModal";

import {
  Calendar,
  Edit3,
  BarChart3,
  Trash2,
  ExternalLink,
  CheckCircle2,
  FileText,
} from "lucide-react";

import { useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { useState } from "react";

import { deleteForm } from "../services/formsService";

import useAuth from "../../Auth/useAuth";

function FormCard({ dataForm }) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { user } = useAuth();

  const [isDeleting, setIsDeleting] = useState(false);

  const isPublished = dataForm.is_published;

  const formattedDate = new Date(dataForm.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  function handleDelete(event) {
    event.preventDefault();
    event.stopPropagation();

    setShowDeleteModal(true);
  }

  async function handleDeleteConfirm() {
    setIsDeleting(true);

    try {
      await deleteForm(dataForm.id);

      queryClient.invalidateQueries({
        queryKey: ["forms", user.id],
      });

      toast.success("Form deleted successfully!");

      setShowDeleteModal(false);
    } catch {
      toast.error("Failed to delete form.");
    } finally {
      setIsDeleting(false);
    }
  }

  function handleResponses(event) {
    event.preventDefault();
    event.stopPropagation();

    navigate(`/responses/${dataForm.id}`);
  }

  function handlePublicForm(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!dataForm.public_id) return;

    window.open(`/form/${dataForm.public_id}`, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <article
        className="
          group
          flex
          min-h-[180px]
          flex-col
          justify-between
          rounded-2xl
          border
          border-gray-100
          bg-white
          p-5
          shadow-sm
          transition-all
          duration-200
          hover:-translate-y-0.5
          hover:border-indigo-100
          hover:shadow-md
        "
      >
        {/* Header */}
        <div>
          <div className="mb-4 flex items-start justify-between gap-3">
            {/* Form icon */}
            <div
              className={`
                flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                ${
                  isPublished
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-gray-50 text-gray-400"
                }
              `}
            >
              {isPublished ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <FileText className="h-5 w-5" />
              )}
            </div>

            {/* Status */}
            <span
              className={`
                inline-flex items-center gap-1.5
                rounded-full
                px-2.5
                py-1
                text-[11px]
                font-medium
                ${
                  isPublished
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-gray-100 text-gray-500"
                }
              `}
            >
              <span
                className={`
                  h-1.5
                  w-1.5
                  rounded-full
                  ${isPublished ? "bg-emerald-500" : "bg-gray-400"}
                `}
              />

              {isPublished ? "Published" : "Draft"}
            </span>
          </div>

          {/* Title */}
          <h3
            className="
              mb-2
              truncate
              text-sm
              font-semibold
              text-gray-900
              transition-colors
              group-hover:text-indigo-700
            "
            title={dataForm.title}
          >
            {dataForm.title}
          </h3>

          {/* Date */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Calendar className="h-3.5 w-3.5" />

            <span>Created {formattedDate}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between gap-3">
          {/* Public form */}
          <div>
            {isPublished && dataForm.public_id ? (
              <button
                type="button"
                onClick={handlePublicForm}
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-lg
                  px-2.5
                  py-1.5
                  text-xs
                  font-medium
                  text-indigo-600
                  transition-colors
                  hover:bg-indigo-50
                  hover:text-indigo-700
                "
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View form
              </button>
            ) : (
              <span className="text-xs text-gray-300">Not published</span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Edit */}
            <Link
              to={`/builder/${dataForm.id}`}
              aria-label="Edit form"
              title="Edit form"
              className="
                rounded-lg
                p-2
                text-gray-400
                transition-colors
                hover:bg-indigo-50
                hover:text-indigo-600
              "
            >
              <Edit3 className="h-4 w-4" />
            </Link>

            {/* Responses */}
            {isPublished && (
              <button
                type="button"
                onClick={handleResponses}
                aria-label="View responses"
                title="View responses"
                className="
                  rounded-lg
                  p-2
                  text-gray-400
                  transition-colors
                  hover:bg-emerald-50
                  hover:text-emerald-600
                "
              >
                <BarChart3 className="h-4 w-4" />
              </button>
            )}

            {/* Delete */}
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              aria-label="Delete form"
              title="Delete form"
              className="
                rounded-lg
                p-2
                text-gray-400
                transition-colors
                hover:bg-rose-50
                hover:text-rose-600
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </article>

      {/* Delete confirmation modal */}
      <DeleteFormModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        formTitle={dataForm.title}
        isDeleting={isDeleting}
      />
    </>
  );
}

export default FormCard;

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
  Clock,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import { deleteForm } from "../services/formsService";
import useAuth from "../../Auth/useAuth";

function FormCard({ dataForm }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
          relative
          flex
          min-h-[195px]
          flex-col
          justify-between
          rounded-2xl
          border
          border-slate-200/80
          bg-white
          p-5
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-slate-300
          hover:shadow-xl
          hover:shadow-slate-200/50
        "
      >
        {/* Top Header Section */}
        <div>
          <div className="mb-4 flex items-start justify-between gap-3">
            {/* Form status icon */}
            <div
              className={`
                flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300
                ${
                  isPublished
                    ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/10 group-hover:scale-105"
                    : "bg-amber-50/80 text-amber-600 ring-1 ring-amber-500/10 group-hover:scale-105"
                }
              `}
            >
              {isPublished ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <FileText className="h-5 w-5" />
              )}
            </div>

            {/* Status Badge */}
            <span
              className={`
                inline-flex items-center gap-1.5
                rounded-full
                px-2.5
                py-1
                text-[11px]
                font-semibold
                tracking-wide
                transition-all
                ${
                  isPublished
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                    : "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20"
                }
              `}
            >
              <span
                className={`
                  h-1.5
                  w-1.5
                  rounded-full
                  ${isPublished ? "bg-emerald-500 animate-pulse" : "bg-amber-400"}
                `}
              />
              {isPublished ? "Published" : "Draft"}
            </span>
          </div>

          {/* Form Title */}
          <h3
            className="
              mb-1.5
              truncate
              text-base
              font-bold
              text-slate-900
              transition-colors
              duration-200
              group-hover:text-indigo-600
            "
            title={dataForm.title || "Untitled Form"}
          >
            {dataForm.title || "Untitled Form"}
          </h3>

          {/* Created Date */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>Created {formattedDate}</span>
          </div>
        </div>

        {/* Footer Actions Section */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-3.5">
          {/* Public Link Action */}
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
                  px-2
                  py-1
                  text-xs
                  font-semibold
                  text-indigo-600
                  transition-all
                  duration-200
                  hover:bg-indigo-50
                  hover:text-indigo-700
                  active:scale-95
                "
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View form
              </button>
            ) : (
              <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                <Clock className="h-3 w-3" />
                Not published
              </span>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1">
            {/* Edit Button */}
            <Link
              to={`/builder/${dataForm.id}`}
              aria-label="Edit form"
              title="Edit form"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                text-slate-400
                transition-all
                duration-200
                hover:bg-slate-100
                hover:text-indigo-600
                active:scale-95
              "
            >
              <Edit3 className="h-4 w-4" />
            </Link>

            {/* View Responses Button */}
            {isPublished && (
              <button
                type="button"
                onClick={handleResponses}
                aria-label="View responses"
                title="View responses"
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-400
                  transition-all
                  duration-200
                  hover:bg-emerald-50
                  hover:text-emerald-600
                  active:scale-95
                "
              >
                <BarChart3 className="h-4 w-4" />
              </button>
            )}

            {/* Delete Button */}
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              aria-label="Delete form"
              title="Delete form"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                text-slate-400
                transition-all
                duration-200
                hover:bg-rose-50
                hover:text-rose-600
                active:scale-95
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

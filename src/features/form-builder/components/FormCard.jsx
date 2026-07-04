/** @format */

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Calendar, Edit3, BarChart3, Trash2 } from "lucide-react";

import { useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { useState } from "react";
import { deleteForm } from "../services/formsService";
import useAuth from "../../Auth/useAuth";

function FormCard({ dataForm }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete(e) {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this form?")) return;

    setIsDeleting(true);
    try {
      await deleteForm(dataForm.id);
      queryClient.invalidateQueries({ queryKey: ["forms", user.id] });
      toast.success("Form deleted successfully!");
    } catch {
      toast.error("Failed to delete form.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-indigo-200 transition-all duration-200 flex flex-col justify-between">
      {/* Top */}
      <div>
        <h3 className="font-semibold text-gray-900 truncate mb-2 group-hover:text-indigo-700 transition-colors">
          {dataForm.title}
        </h3>

        {/* Date */}
        <p className="text-xs text-gray-400 flex items-center gap-1.5 mb-3">
          <Calendar className="w-3 h-3" />
          {new Date(dataForm.created_at).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Bottom */}
      <div className="flex items-center justify-between gap-2">
        {/* Badge */}
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            dataForm.is_published
              ? "bg-emerald-50 text-emerald-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {dataForm.is_published ? "Published" : "Draft"}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-0.5">
          {/* Edit */}
          <Link
            to={`/builder/${dataForm.id}`}
            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            title="Edit form"
          >
            <Edit3 className="w-4 h-4" />
          </Link>

          {/* Responses */}
          {dataForm.is_published && (
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate(`/responses/${dataForm.id}`);
              }}
              className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              title="View responses"
            >
              <BarChart3 className="w-4 h-4" />
            </button>
          )}

          {/* Delete */}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete form"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormCard;

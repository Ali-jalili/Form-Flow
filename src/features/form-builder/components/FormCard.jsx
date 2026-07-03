/** @format */

import { Link } from "react-router-dom";

function FormCard({ dataForm }) {
  return (
    <Link
      to={`/builder/${dataForm.id}`}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
    >
      <h3 className="font-semibold text-gray-900 truncate mb-2">
        {dataForm.title}
      </h3>
      <p className="text-xs text-gray-400 mb-3">
        {new Date(dataForm.created_at).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
      <span
        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
          dataForm.is_published
            ? "bg-green-50 text-green-700"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {dataForm.is_published && (
          <Link
            to={`/responses/${dataForm.id}`}
            className="text-xs text-indigo-600 hover:text-indigo-700 font-medium mt-2 inline-block"
          >
            View Responses →
          </Link>
        )}
      </span>
    </Link>
  );
}

export default FormCard;

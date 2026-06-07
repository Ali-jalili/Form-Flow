/** @format */

import { Link } from "react-router-dom";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl text-gray-400">+</span>
      </div>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">No forms yet</h2>
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
}

export default EmptyState;

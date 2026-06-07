/** @format */

import { Link } from "react-router-dom";
import useAuth from "../../features/Auth/useAuth";
import { Layout } from "lucide-react";

function Header() {
  const { user, handlelogout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <Layout className="w-6 h-6" />
          <span className="font-bold text-lg">FormFlow</span>
        </Link>

        {/* Navigation */}
        {user ? (
          <div className="flex items-center gap-3 text-sm">
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Dashboard
            </Link>
            <button
              onClick={handlelogout}
              className="text-gray-500 hover:text-rose-600 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-sm">
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

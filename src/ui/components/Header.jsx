/** @format */

import { Link } from "react-router-dom";
import useAuth from "../../features/Auth/useAuth";
import { Layout, LogOut, LayoutDashboard } from "lucide-react";

function Header() {
  const { user, handlelogout } = useAuth();

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors group"
        >
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
            <Layout className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg">FormFlow</span>
        </Link>

        {/* Navigation */}
        {user ? (
          <div className="flex items-center gap-4 text-sm">
            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 text-gray-600 hover:text-indigo-600 transition-colors font-medium"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <button
              onClick={handlelogout}
              className="flex items-center gap-1.5 text-gray-400 hover:text-rose-600 transition-colors font-medium"
            >
              <LogOut className="w-4 h-4" />
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
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300"
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

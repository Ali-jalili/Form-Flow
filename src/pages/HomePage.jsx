/** @format */

import { Link } from "react-router-dom";
import { Layout, Zap, BarChart3, ArrowRight } from "lucide-react";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-16 sm:pt-28 sm:pb-24 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
          Build Forms That
          <span className="text-indigo-600"> Work for You</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Create beautiful, responsive forms in minutes. Collect responses,
          analyze results, and share anywhere — all in one place.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/signup"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md text-lg inline-flex items-center gap-2"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/login"
            className="text-gray-600 hover:text-gray-900 font-medium px-8 py-3.5 rounded-lg transition-colors text-lg"
          >
            Sign in →
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 pb-20 sm:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Layout className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Drag & Drop Builder
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Intuitive drag-and-drop editor. Add text fields, multiple choice,
              ratings, and more in seconds.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Instant Sharing
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              One click to publish. Share your form link anywhere — email,
              social media, or embed on your website.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Smart Analytics
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Beautiful charts and real-time insights. Understand your responses
              at a glance.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-sm text-gray-400">
            © 2025 FormFlow. Built for developers, by a developer.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;

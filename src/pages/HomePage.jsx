/** @format */

import { Link } from "react-router-dom";
import {
  Layout,
  Zap,
  BarChart3,
  ArrowRight,
  Sparkles,
  Share2,
  FileText,
} from "lucide-react";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-24 sm:pt-32 pb-16 sm:pb-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-full px-4 py-1.5 text-sm text-indigo-700 mb-8">
          <Sparkles className="w-4 h-4" />
          Now in Public Beta
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
          Forms that{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            work for you
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Create stunning forms in minutes. Drag & drop fields, share instantly,
          and watch the responses flow in with beautiful analytics.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/signup"
            className="group inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 text-lg"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium px-8 py-3.5 rounded-xl transition-colors text-lg"
          >
            Sign in
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 pb-20 sm:pb-28">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Everything you need
          </h2>
          <p className="mt-3 text-gray-500 text-lg">
            Powerful features to create, share, and analyze your forms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md hover:border-indigo-200 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <Layout className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Drag & Drop Builder
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Intuitive editor with drag-and-drop fields. Add text, multiple
              choice, ratings, and more in seconds.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md hover:border-indigo-200 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <Share2 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Instant Sharing
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              One click to publish. Share your form link anywhere — email,
              social media, or embed on your website.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md hover:border-indigo-200 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Smart Analytics
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Beautiful charts and real-time insights. Understand your responses
              at a glance with visual reports.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 pb-20 sm:pb-28">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            How it works
          </h2>
          <p className="mt-3 text-gray-500 text-lg">
            Three simple steps to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg shadow-indigo-200">
              1
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Create</h3>
            <p className="text-sm text-gray-500">
              Build your form with our drag & drop editor.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg shadow-purple-200">
              2
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Publish
            </h3>
            <p className="text-sm text-gray-500">
              One click to publish and get a shareable link.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg shadow-emerald-200">
              3
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Collect
            </h3>
            <p className="text-sm text-gray-500">
              Watch responses come in with real-time analytics.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 pb-20 sm:pb-28">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-center shadow-xl shadow-indigo-200">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to build your first form?
          </h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of users who are creating beautiful forms with
            FormFlow.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-colors text-lg shadow-lg"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-500">
            <FileText className="w-5 h-5 text-indigo-500" />
            <span className="font-semibold text-gray-700">FormFlow</span>
          </div>
          <p className="text-sm text-gray-400">
            © 2025 FormFlow. Built with ❤️ for developers.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;

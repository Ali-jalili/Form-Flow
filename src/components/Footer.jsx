/** @format */

import { Github, Heart, Layout, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-gray-900"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-all duration-200 group-hover:bg-indigo-100 group-hover:scale-105">
                <Layout className="h-4 w-4" />
              </span>

              <span className="text-base font-bold tracking-tight">
                FormFlow
              </span>
            </Link>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              A modern form builder for creating, sharing, and analyzing forms
              with ease.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Link
              to="/"
              className="text-gray-500 transition-colors hover:text-gray-900"
            >
              Home
            </Link>

            <Link
              to="/login"
              className="text-gray-500 transition-colors hover:text-gray-900"
            >
              Log in
            </Link>

            <Link
              to="/signup"
              className="text-gray-500 transition-colors hover:text-gray-900"
            >
              Sign up
            </Link>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-gray-500 transition-colors hover:text-gray-900"
            >
              <Github className="h-4 w-4" />
              GitHub
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col gap-3 border-t border-gray-100 pt-6 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} FormFlow. All rights reserved.</p>

          <p className="flex items-center gap-1.5">
            Built with
            <Heart className="h-3.5 w-3.5 fill-rose-400 text-rose-400" />
            for the web
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

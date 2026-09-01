/** @format */

import { Heart, Layout } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <Layout className="h-4 w-4" />
            </div>

            <div>
              <span className="font-semibold text-gray-800">FormFlow</span>

              <p className="text-xs text-gray-400">
                Build forms. Collect responses.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <p className="flex items-center gap-1.5 text-xs text-gray-400">
            © {currentYear} FormFlow
            <span className="text-gray-300">•</span>
            Built with
            <Heart className="h-3.5 w-3.5 fill-rose-400 text-rose-400" />
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

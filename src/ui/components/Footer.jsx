/** @format */

import { Layout, Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-white/50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2 text-gray-400">
          <Layout className="w-4 h-4" />
          <span className="font-semibold text-sm text-gray-500">FormFlow</span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400 flex items-center gap-1">
          © 2025 — Built with{" "}
          <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
        </p>
      </div>
    </footer>
  );
}

export default Footer;

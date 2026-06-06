/** @format */

import { useState } from "react";
import useAuth from "../features/Auth/useAuth";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {
  const { handleSignup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("Please fill in all fields.");
    }

    setIsLoading(true);

    try {
      await handleSignup(email, password, name);
      toast.success("Welcome...");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 w-full max-w-md">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Create Account
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1 mb-6">
          Start building forms in minutes
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your name..."
              id="name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email..."
              id="email"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password..."
              id="password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
            />
          </div>

          {/* Submit */}
          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;

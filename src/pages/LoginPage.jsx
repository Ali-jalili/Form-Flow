/** @format */

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LogIn, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";

import useAuth from "../features/Auth/useAuth";

function LoginPage() {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData) {
    try {
      await handleLogin(formData.email, formData.password);

      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Unable to log in. Please try again.");
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 px-4">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-indigo-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-purple-100/40 blur-3xl" />

      <div className="relative flex min-h-screen items-center justify-center py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-2xl border border-gray-100 bg-white/90 p-6 shadow-xl shadow-gray-200/40 backdrop-blur-sm sm:p-8">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                <LogIn className="h-6 w-6 text-indigo-600" />
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Welcome back
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                Log in to your account to continue
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>

                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      aria-invalid={errors.email ? "true" : "false"}
                      {...register("email", {
                        required: "Email is required.",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email address.",
                        },
                      })}
                      className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-gray-400 ${
                        errors.email
                          ? "border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10"
                          : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                      }`}
                    />
                  </div>

                  {errors.email && (
                    <p className="mt-1.5 text-xs text-rose-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      aria-invalid={errors.password ? "true" : "false"}
                      {...register("password", {
                        required: "Password is required.",
                      })}
                      className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-gray-400 ${
                        errors.password
                          ? "border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10"
                          : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                      }`}
                    />
                  </div>

                  {errors.password && (
                    <p className="mt-1.5 text-xs text-rose-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Logging in..." : "Log in"}
              </button>
            </form>

            {/* Signup */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-indigo-600 transition-colors hover:text-indigo-700"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

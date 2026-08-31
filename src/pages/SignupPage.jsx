/** @format */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ArrowRight, Eye, EyeOff, UserPlus } from "lucide-react";
import useAuth from "../features/Auth/useAuth";

function SignupPage() {
  const { handleSignup } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);

    try {
      await handleSignup(values.email, values.password, values.name);

      toast.success("Account created! Welcome aboard!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Failed to create account.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 px-4 py-12 sm:py-16">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-indigo-200/20 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-purple-200/20 blur-3xl"
      />

      <section className="relative w-full max-w-md animate-[fadeIn_.4s_ease-out]">
        <div className="rounded-3xl border border-gray-100 bg-white/90 p-6 shadow-xl shadow-gray-200/50 backdrop-blur-sm sm:p-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 ring-1 ring-indigo-100">
              <UserPlus
                aria-hidden="true"
                className="h-6 w-6 text-indigo-600"
              />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Create your account
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Start building beautiful forms in minutes.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-8 space-y-5"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Full name
              </label>

              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your name"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
                disabled={isLoading}
                {...register("name", {
                  required: "Please enter your name.",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters.",
                  },
                })}
                className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-50 ${
                  errors.name
                    ? "border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
                    : "border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                }`}
              />

              {errors.name && (
                <p
                  id="name-error"
                  role="alert"
                  className="mt-1.5 text-xs font-medium text-rose-600"
                >
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                disabled={isLoading}
                {...register("email", {
                  required: "Please enter your email.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address.",
                  },
                })}
                className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-50 ${
                  errors.email
                    ? "border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
                    : "border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                }`}
              />

              {errors.email && (
                <p
                  id="email-error"
                  role="alert"
                  className="mt-1.5 text-xs font-medium text-rose-600"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a password"
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  disabled={isLoading}
                  {...register("password", {
                    required: "Please create a password.",
                    minLength: {
                      value: 5,
                      message: "Password must be at least 6 characters.",
                    },
                  })}
                  className={`w-full rounded-xl border bg-white px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-50 ${
                    errors.password
                      ? "border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
                      : "border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-400 transition-colors hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed"
                >
                  {showPassword ? (
                    <EyeOff aria-hidden="true" className="h-4 w-4" />
                  ) : (
                    <Eye aria-hidden="true" className="h-4 w-4" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p
                  id="password-error"
                  role="alert"
                  className="mt-1.5 text-xs font-medium text-rose-600"
                >
                  {errors.password.message}
                </p>
              )}

              {!errors.password && (
                <p className="mt-1.5 text-xs text-gray-400">
                  Use at least 6 characters.
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                  />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              Log in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default SignupPage;

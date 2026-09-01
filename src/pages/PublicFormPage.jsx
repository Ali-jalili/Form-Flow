/** @format */

import { useParams } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Send,
  CheckCircle2,
  Loader2,
  Circle,
  FileText,
  AlertCircle,
} from "lucide-react";

import usePublicForm from "../features/form/hooks/usePublicForm";
import { submitResponse } from "../features/form/services/formsService";

import Spinner from "../components/ui/Spinner";
import ErrorMessage from "../components/ui/ErrorMessage";

function PublicFormPage() {
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { publicId } = useParams();
  const { data, isLoading, error } = usePublicForm(publicId);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md">
          <ErrorMessage message={error.message} />
        </div>
      </div>
    );
  }

  function validateAnswers() {
    if (!data?.fields?.length) {
      toast.error("This form has no fields to answer.");
      return false;
    }

    for (const field of data.fields) {
      if (!field.required) continue;

      const answer = answers[field.id];

      if (!answer || (typeof answer === "string" && answer.trim() === "")) {
        toast.error(`${field.label || "This field"} is required`);
        return false;
      }
    }

    const hasAnyAnswer = Object.values(answers).some((answer) => {
      if (typeof answer === "string") {
        return answer.trim() !== "";
      }

      return answer !== null && answer !== undefined;
    });

    if (!hasAnyAnswer) {
      toast.error("Please answer at least one question.");
      return false;
    }

    return true;
  }

  async function handleSubmit() {
    if (isSubmitting) return;

    if (!validateAnswers()) return;

    setIsSubmitting(true);

    try {
      await submitResponse(data.form.id, answers);

      toast.success("Response submitted!");

      setIsSubmitted(true);
      setAnswers({});
    } catch (error) {
      console.error("Submit error:", error);

      toast.error("Failed to submit response.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 px-4 py-10">
        <div className="flex min-h-[80vh] items-center justify-center">
          <div className="w-full max-w-md">
            <div className="rounded-3xl border border-gray-200/70 bg-white p-8 text-center shadow-xl shadow-gray-200/40 sm:p-10">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Response submitted
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Thank you for your response. Your answers have been successfully
                recorded.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const fields = data.fields || [];

  if (fields.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 px-4 py-10">
        <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center">
          <div className="w-full rounded-3xl border border-gray-200/70 bg-white p-8 text-center shadow-xl shadow-gray-200/40 sm:p-12">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50">
              <AlertCircle className="h-7 w-7 text-amber-500" />
            </div>

            <h1 className="text-xl font-bold text-gray-900">
              This form is empty
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              There are currently no questions available to answer.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-4 flex items-center gap-2 text-xs font-medium text-indigo-600">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50">
              <FileText className="h-4 w-4" />
            </div>

            <span>Form</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {data.form.title || "Untitled Form"}
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Please complete the form below and submit your response.
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
            <span>
              {fields.length} {fields.length === 1 ? "question" : "questions"}
            </span>

            <span className="h-1 w-1 rounded-full bg-gray-300" />

            <span>
              <span className="text-rose-500">*</span> Required
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="overflow-hidden rounded-3xl border border-gray-200/70 bg-white shadow-xl shadow-gray-200/40">
          <div className="p-5 sm:p-8">
            <div className="space-y-8">
              {fields.map((field) => {
                const answer = answers[field.id] || "";

                return (
                  <div
                    key={field.id}
                    className="relative rounded-2xl border border-gray-100 bg-gray-50/40 p-4 sm:p-5"
                  >
                    {/* Question */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold leading-6 text-gray-800">
                        {field.label || "Untitled Field"}

                        {field.required && (
                          <span
                            className="ml-1.5 text-rose-500"
                            aria-label="required"
                          >
                            *
                          </span>
                        )}
                      </label>

                      {field.required && (
                        <span className="mt-0.5 block text-xs text-gray-400">
                          Required
                        </span>
                      )}
                    </div>

                    {/* Short text */}
                    {field.type === "short_text" && (
                      <input
                        value={answer}
                        onChange={(e) =>
                          setAnswers((current) => ({
                            ...current,
                            [field.id]: e.target.value,
                          }))
                        }
                        type="text"
                        placeholder="Type your answer..."
                        disabled={isSubmitting}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-70"
                      />
                    )}

                    {/* Long text */}
                    {field.type === "long_text" && (
                      <textarea
                        value={answer}
                        onChange={(e) =>
                          setAnswers((current) => ({
                            ...current,
                            [field.id]: e.target.value,
                          }))
                        }
                        rows={4}
                        placeholder="Type your answer..."
                        disabled={isSubmitting}
                        className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm leading-6 text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-70"
                      />
                    )}

                    {/* Multiple choice */}
                    {field.type === "multiple_choice" && (
                      <div className="space-y-2">
                        {field.options
                          ?.filter((opt) => opt && opt.trim() !== "")
                          .map((opt, i) => {
                            const selected = answers[field.id] === opt;

                            return (
                              <button
                                key={`${field.id}-${i}`}
                                type="button"
                                disabled={isSubmitting}
                                onClick={() =>
                                  setAnswers((current) => {
                                    const currentAnswer = current[field.id];

                                    if (currentAnswer === opt) {
                                      const next = { ...current };
                                      delete next[field.id];

                                      return next;
                                    }

                                    return {
                                      ...current,
                                      [field.id]: opt,
                                    };
                                  })
                                }
                                className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 ${
                                  selected
                                    ? "border-indigo-300 bg-indigo-50 shadow-sm"
                                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                                } ${
                                  isSubmitting
                                    ? "cursor-not-allowed opacity-70"
                                    : "cursor-pointer"
                                }`}
                              >
                                {selected ? (
                                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-indigo-500">
                                    <div className="h-2 w-2 rounded-full bg-indigo-500" />
                                  </div>
                                ) : (
                                  <Circle className="h-4 w-4 shrink-0 text-gray-300" />
                                )}

                                <span
                                  className={`text-sm ${
                                    selected
                                      ? "font-medium text-indigo-900"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {opt}
                                </span>
                              </button>
                            );
                          })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Submit */}
            <div className="mt-8 border-t border-gray-100 pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200/60 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200/70 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    Submit response
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-xs text-gray-400">
                Your response will be securely recorded.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicFormPage;

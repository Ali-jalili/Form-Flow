/** @format */

import { useParams } from "react-router-dom";
import usePublicForm from "../features/form-builder/hooks/usePublicForm";
import Spinner from "../ui/components/Spinner";
import ErrorMessage from "../ui/components/ErrorMessage";
import { useState } from "react";
import { submitResponse } from "../features/form-builder/services/formsService";
import toast from "react-hot-toast";
import { Send, CheckCircle } from "lucide-react";

function PublicFormPage() {
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { publicId } = useParams();

  const { data, isLoading, error } = usePublicForm(publicId);

  if (isLoading) return <Spinner />;

  if (error) return <ErrorMessage message={error.message} />;

  async function handleSubmit() {
    try {
      await submitResponse(data.form.id, answers);
      toast.success("Response submitted!");
      setIsSubmitted(true);
      setAnswers({});
    } catch {
      toast.error("Failed to submit response.");
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Response Submitted
          </h1>
          <p className="text-sm text-gray-500">
            Thank you for your response! Your answers have been recorded.
          </p>
        </div>
      </div>
    );
  }

  if (data)
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {data.form.title}
            </h1>
            <p className="text-sm text-gray-400 mb-6">
              Please fill out this form.
            </p>

            <div className="h-px bg-gray-100 my-6" />

            {/* Fields */}
            <div className="space-y-6">
              {data.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>

                  {field.type === "short_text" && (
                    <input
                      value={answers[field.id] || ""}
                      onChange={(e) =>
                        setAnswers({ ...answers, [field.id]: e.target.value })
                      }
                      type="text"
                      placeholder="Type your answer..."
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm"
                    />
                  )}

                  {field.type === "long_text" && (
                    <textarea
                      value={answers[field.id] || ""}
                      onChange={(e) =>
                        setAnswers({ ...answers, [field.id]: e.target.value })
                      }
                      rows={3}
                      placeholder="Type your answer..."
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm resize-none"
                    />
                  )}

                  {field.type === "multiple_choice" && (
                    <div className="space-y-2">
                      {field.options?.map((opt, i) => (
                        <label
                          key={i}
                          onClick={() =>
                            setAnswers({ ...answers, [field.id]: opt })
                          }
                          className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                            answers[field.id] === opt
                              ? "border-indigo-400 bg-indigo-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                              answers[field.id] === opt
                                ? "border-indigo-500 bg-indigo-500"
                                : "border-gray-300"
                            }`}
                          />
                          <span className="text-sm text-gray-700">{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Submit */}
            <div className="mt-8">
              <button
                onClick={handleSubmit}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md inline-flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default PublicFormPage;

/** @format */

import { useParams, Link } from "react-router-dom";
import useResponses from "../features/form-builder/hooks/useResponses";
import Spinner from "../ui/components/Spinner";
import ErrorMessage from "../ui/components/ErrorMessage";
import useFormFields from "../features/form-builder/hooks/useFormFields";
import useForms from "../features/form-builder/hooks/useForms";
import {
  ArrowLeft,
  MessageSquare,
  Calendar,
  User,
  BarChart3,
} from "lucide-react";

function ResponsesPage() {
  const { formId } = useParams();
  const { data: responses, isLoading, error } = useResponses(formId);
  const { data: fieldsData } = useFormFields(formId);
  const { data: formsList } = useForms();
  const formData = formsList?.find((f) => f.id === formId);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;

  if (responses) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-indigo-600 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {formData?.title || "Responses"}
                </h1>
                <p className="text-sm text-gray-500 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {responses.length}{" "}
                  {responses.length === 1 ? "response" : "responses"}
                </p>
              </div>
            </div>
          </div>

          {/* Responses List */}
          <div className="space-y-4">
            {responses.map((response) => (
              <div
                key={response.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
              >
                {/* Date */}
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(response.created_at).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>

                {/* Fields */}
                <div className="space-y-3">
                  {fieldsData?.map((field) => (
                    <div key={field.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <User className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">
                          {field.label}
                        </p>
                        <p className="text-sm text-gray-700">
                          {response.data[field.id] || (
                            <span className="text-gray-300 italic">
                              No answer
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {responses.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500">No responses yet.</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ResponsesPage;

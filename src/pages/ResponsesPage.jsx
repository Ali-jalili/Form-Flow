/** @format */

import { useParams, Link } from "react-router-dom";

import useResponses from "../features/form/hooks/useResponses";
import useFormFields from "../features/form/hooks/useFormFields";
import useForms from "../features/form/hooks/useForms";

import ErrorMessage from "../components/ui/ErrorMessage";
import Spinner from "../components/ui/Spinner";

import {
  ArrowLeft,
  MessageSquare,
  Calendar,
  BarChart3,
  FileText,
  Inbox,
} from "lucide-react";

function ResponsesPage() {
  const { formId } = useParams();

  const { data: responses, isLoading, error } = useResponses(formId);

  const { data: fieldsData } = useFormFields(formId);

  const { data: formsList } = useForms();

  const formData = formsList?.find((form) => form.id === formId);

  if (isLoading) return <Spinner />;

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!responses) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-10">
        {/* Header */}
        <header className="mb-8">
          <Link
            to="/dashboard"
            className="
              mb-6
              inline-flex
              items-center
              gap-1.5
              text-sm
              font-medium
              text-gray-400
              transition-colors
              hover:text-indigo-600
            "
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3.5">
              {/* Form icon */}
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-indigo-50
                  text-indigo-600
                  ring-1
                  ring-indigo-100
                "
              >
                <BarChart3 className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1
                    className="
                      truncate
                      text-xl
                      font-bold
                      tracking-tight
                      text-gray-900
                      sm:text-2xl
                    "
                    title={formData?.title}
                  >
                    {formData?.title || "Form Responses"}
                  </h1>
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                  <MessageSquare className="h-3.5 w-3.5" />

                  <span>
                    {responses.length}{" "}
                    {responses.length === 1 ? "response" : "responses"}
                  </span>
                </div>
              </div>
            </div>

            {/* Response count */}
            <div
              className="
                hidden
                shrink-0
                rounded-xl
                border
                border-gray-100
                bg-white
                px-4
                py-2.5
                text-right
                shadow-sm
                sm:block
              "
            >
              <p className="text-lg font-bold leading-none text-gray-900">
                {responses.length}
              </p>

              <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-gray-400">
                Total
              </p>
            </div>
          </div>
        </header>

        {/* Empty State */}
        {responses.length === 0 ? (
          <div
            className="
              rounded-2xl
              border
              border-gray-100
              bg-white
              px-6
              py-16
              text-center
              shadow-sm
            "
          >
            <div
              className="
                mx-auto
                mb-5
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-indigo-50
                text-indigo-400
              "
            >
              <Inbox className="h-8 w-8" />
            </div>

            <h2 className="text-base font-semibold text-gray-900">
              No responses yet
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Once someone submits this form, their responses will appear here.
            </p>

            <Link
              to={`/builder/${formId}`}
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-indigo-600
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                shadow-indigo-200
                transition-all
                hover:bg-indigo-700
                hover:shadow-md
              "
            >
              <FileText className="h-4 w-4" />
              Edit form
            </Link>
          </div>
        ) : (
          /* Responses */
          <div className="space-y-4">
            {responses.map((response, index) => (
              <article
                key={response.id}
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-100
                  bg-white
                  shadow-sm
                  transition-all
                  duration-200
                  hover:border-indigo-100
                  hover:shadow-md
                "
              >
                {/* Response Header */}
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    border-b
                    border-gray-100
                    px-5
                    py-4
                    sm:px-6
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-indigo-50
                        text-xs
                        font-bold
                        text-indigo-600
                      "
                    >
                      {index + 1}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Response #{index + 1}
                      </p>

                      <div className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-400">
                        <Calendar className="h-3.5 w-3.5" />

                        <span>
                          {new Date(response.created_at).toLocaleString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Answers */}
                <div className="divide-y divide-gray-50 px-5 sm:px-6">
                  {fieldsData?.map((field) => {
                    const answer = response.data?.[field.id];

                    const hasAnswer =
                      answer !== null &&
                      answer !== undefined &&
                      String(answer).trim() !== "";

                    return (
                      <div key={field.id} className="py-4 first:pt-5 last:pb-5">
                        <div className="mb-1.5 flex items-start gap-2">
                          <span
                            className="
                              mt-1
                              h-1.5
                              w-1.5
                              shrink-0
                              rounded-full
                              bg-indigo-400
                            "
                          />

                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            {field.label}
                          </p>
                        </div>

                        <div className="pl-3.5">
                          {hasAnswer ? (
                            <p className="whitespace-pre-wrap break-words text-sm leading-6 text-gray-700">
                              {String(answer)}
                            </p>
                          ) : (
                            <p className="text-sm italic text-gray-300">
                              No answer
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResponsesPage;

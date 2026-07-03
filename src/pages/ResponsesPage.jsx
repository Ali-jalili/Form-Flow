/** @format */

import { useParams } from "react-router-dom";
import useResponses from "../features/form-builder/hooks/useResponses";
import Spinner from "../ui/components/Spinner";
import ErrorMessage from "../ui/components/ErrorMessage";
import useFormFields from "../features/form-builder/hooks/useFormFields";

function ResponsesPage() {
  const { formId } = useParams();
  const { data, isLoading, error } = useResponses(formId);
  const { data: fieldsData } = useFormFields(formId);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;

  if (data) {
    return (
      <div>
        <h2>{data.length} Responses</h2>

        {data.map((response) => (
          <div key={response.id}>
            <p>{new Date(response.created_at).toLocaleString()}</p>
            {fieldsData?.map((field) => (
              <p key={field.id}>
                <strong>{field.label}:</strong> {response.data[field.id] || "—"}
              </p>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default ResponsesPage;

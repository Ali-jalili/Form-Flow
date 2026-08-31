/** @format */

import { useQuery } from "@tanstack/react-query";
import { getFormFields } from "../services/formsService";

function useFormFields(formId) {
  const { data, isLoading, isFetching, isFetched, error } = useQuery({
    queryKey: ["form_fields", formId],
    queryFn: () => getFormFields(formId),
    enabled: !!formId,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
  });

  return {
    data,
    isLoading,
    isFetching,
    isFetched,
    error,
  };
}

export default useFormFields;

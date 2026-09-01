/** @format */

import { useQuery } from "@tanstack/react-query";
import { getForm } from "../services/formsService";

function useFormData(formId) {
  const { data, isLoading, isFetching, isFetched, error } = useQuery({
    queryKey: ["form", formId],
    queryFn: () => getForm(formId),
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

export default useFormData;

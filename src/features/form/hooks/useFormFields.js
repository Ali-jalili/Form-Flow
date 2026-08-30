/** @format */

import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabaseClient";

function useFormFields(formId) {
  async function fetchFormFields() {
    const { data, error } = await supabase
      .from("form_fields")
      .select("*")
      .eq("form_id", formId);

    if (error) throw new Error(error.message);

    return data;
  }

  const { data, isLoading, isFetching, isFetched, error } = useQuery({
    queryKey: ["form_fields", formId],
    queryFn: fetchFormFields,
    enabled: !!formId,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
  });

  return { data, isLoading, isFetching, isFetched, error };
}

export default useFormFields;

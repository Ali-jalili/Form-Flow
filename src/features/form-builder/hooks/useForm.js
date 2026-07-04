/** @format */

import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabaseClient";

function useForm(formId) {
  async function fetchForm() {
    const { data, error } = await supabase
      .from("forms")
      .select("*")
      .eq("id", formId)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  const { data, isLoading, isFetching, isFetched, error } = useQuery({
    queryKey: ["form", formId],
    queryFn: fetchForm,
    enabled: !!formId,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
  });

  return { data, isLoading, isFetching, isFetched, error };
}

export default useForm;

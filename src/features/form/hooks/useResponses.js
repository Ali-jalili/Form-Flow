/** @format */

import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabaseClient";

function useResponses(formId) {
  async function fetchResponses() {
    const { data, error } = await supabase
      .from("responses")
      .select("*")
      .eq("form_id", formId);

    if (error) throw error;
    return data;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["responses", formId],
    queryFn: fetchResponses,
    enabled: !!formId,
  });

  return { data, isLoading, error };
}

export default useResponses;

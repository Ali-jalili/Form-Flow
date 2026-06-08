/** @format */

import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabaseClient";

function useFormFields(formId) {
  async function feachFormFields() {
    const { data, error } = await supabase
      .from("form_fields")
      .select("*")
      .eq("form_id", formId);

    if (error) throw new Error(error.message);

    return data;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["form_fields", formId],
    queryFn: feachFormFields,
    enabled: !!formId,
  });

  return { data, isLoading, error };
}

export default useFormFields;

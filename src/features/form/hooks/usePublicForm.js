/** @format */

import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabaseClient";

function usePublicForm(publicId) {
  async function fetchPublicForm() {
    const { data: formData, error: formError } = await supabase
      .from("forms")
      .select("*")
      .eq("public_id", publicId)
      .eq("is_published", true)
      .single();

    const { data: fieldsData, error: fieldsError } = await supabase
      .from("form_fields")
      .select("*")
      .eq("form_id", formData.id)
      .order("order");

    if (fieldsError) throw fieldsError;
    if (formError) throw formError;

    return { form: formData, fields: fieldsData };
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["publicForm", publicId],
    queryFn: fetchPublicForm,
    enabled: !!publicId,
  });

  return { data, isLoading, error };
}

export default usePublicForm;

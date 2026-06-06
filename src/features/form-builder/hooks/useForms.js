/** @format */

import { supabase } from "../../../lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Auth/useAuth";

function useForms() {
  const { user } = useAuth();
  const userId = user?.id;

  async function fetchForms() {
    const { data, error } = await supabase
      .from("forms")
      .select("*")
      .eq("user_id", userId);
    if (error) throw new Error(error.message);

    return data;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["forms", userId],
    queryFn: fetchForms,
    enabled: !!userId,
  });

  return { data, isLoading, error };
}

export default useForms;

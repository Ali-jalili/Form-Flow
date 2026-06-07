/** @format */

import { supabase } from "../../../lib/supabaseClient";

/** @format */
async function createForm(userId) {
  const { data, error } = await supabase
    .from("forms")
    .insert({
      user_id: userId,
      title: "Untitled Form",
    })
    .select()
    .single();
  if (error) throw error.message;
  return data;
}

export default createForm;

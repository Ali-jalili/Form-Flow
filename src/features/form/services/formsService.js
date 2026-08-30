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

async function saveFormFields(formId, fields) {
  const { error: deleteError } = await supabase
    .from("form_fields")
    .delete()
    .eq("form_id", formId);

  if (deleteError) throw deleteError.message;

  if (fields.length === 0) return;

  const fieldsToInsert = fields.map((field) => ({
    id: field.id,
    form_id: formId,
    type: field.type,
    label: field.label,
    required: field.required,
    options:
      field.type === "multiple_choice"
        ? (field.options || []).filter((opt) => opt && opt.trim() !== "")
        : field.options,
    order: field.order,
  }));

  const { data, error } = await supabase
    .from("form_fields")
    .insert(fieldsToInsert)
    .select();

  if (error) throw error.message;
  return data;
}

async function updateFormTitle(formId, title) {
  const { error } = await supabase
    .from("forms")
    .update({ title })
    .eq("id", formId);
  if (error) throw error.message;
}

async function publishForm(formId) {
  const publicId = crypto.randomUUID();

  const { error } = await supabase
    .from("forms")
    .update({ is_published: true, public_id: publicId })
    .eq("id", formId);

  if (error) throw error.message;
  return publicId;
}

// async function submitResponse(formId, answers) {
//   const { data, error } = await supabase
//     .from("responses")
//     .insert({
//       form_id: formId,
//       data: answers,
//     })
//     .select()
//     .single();

//   if (error) throw error.message;
//   return data;
// }

async function submitResponse(formId, answers) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const response = await fetch(`${supabaseUrl}/rest/v1/responses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
    body: JSON.stringify({
      form_id: formId,
      data: answers,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to submit response");
  }

  // Body ممکنه خالی باشه
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

async function deleteForm(formId) {
  const { data, error } = await supabase
    .from("forms")
    .delete()
    .eq("id", formId)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export {
  createForm,
  saveFormFields,
  updateFormTitle,
  publishForm,
  submitResponse,
  deleteForm,
};

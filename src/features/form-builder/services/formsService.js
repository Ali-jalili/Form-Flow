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
    options: field.options,
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

export { createForm, saveFormFields, updateFormTitle };

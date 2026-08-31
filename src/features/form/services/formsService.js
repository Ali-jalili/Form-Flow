/** @format */

import { supabase } from "../../../lib/supabaseClient";

async function createForm(userId) {
  const { data, error } = await supabase
    .from("forms")
    .insert({
      user_id: userId,
      title: "Untitled Form",
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
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

  if (error) throw new Error(error.message);
  return data;
}

async function getFormsByUser(userId) {
  const { data, error } = await supabase
    .from("forms")
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  return data;
}

async function getForm(formId) {
  const { data, error } = await supabase
    .from("forms")
    .select("*")
    .eq("id", formId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

async function getFormFields(formId) {
  const { data, error } = await supabase
    .from("form_fields")
    .select("*")
    .eq("form_id", formId);

  if (error) throw new Error(error.message);

  return data;
}

async function updateFormTitle(formId, title) {
  const { error } = await supabase
    .from("forms")
    .update({ title })
    .eq("id", formId);
  if (error) throw new Error(error.message);
}

async function publishForm(formId) {
  const publicId = crypto.randomUUID();

  const { error } = await supabase
    .from("forms")
    .update({ is_published: true, public_id: publicId })
    .eq("id", formId);

  if (error) throw new Error(error.message);
  return publicId;
}

async function submitResponse(formId, answers) {
  const { data, error } = await supabase
    .from("responses")
    .insert({
      form_id: formId,
      data: answers,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
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
  getFormsByUser,
  getForm,
  getFormFields,
  updateFormTitle,
  publishForm,
  submitResponse,
  deleteForm,
};

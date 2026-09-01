/** @format */

export const DEFAULT_FORM_VALUES = {
  title: "",
  fields: [],
};

function normalizeFormValues(values = {}) {
  return {
    title: (values.title || "").trim(),
    fields: (values.fields || []).map((field) => ({
      id: field.id,
      type: field.type,
      label: field.label,
      required: !!field.required,
      options: field.options || [],
    })),
  };
}

export function isDraftDifferentFromServer(draft, serverValues) {
  if (!draft) return false;

  return (
    JSON.stringify(normalizeFormValues(draft)) !==
    JSON.stringify(normalizeFormValues(serverValues))
  );
}

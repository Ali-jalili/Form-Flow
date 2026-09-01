/** @format */

import { useForm, useFieldArray } from "react-hook-form";

const DEFAULT_FORM_VALUES = {
  title: "",
  fields: [],
};

function useFormBuilder(defaultValues = DEFAULT_FORM_VALUES) {
  const form = useForm({
    defaultValues,
  });

  const fieldsArray = useFieldArray({
    control: form.control,
    name: "fields",
  });

  return {
    ...form,
    fieldsArray,
  };
}

export default useFormBuilder;

/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../Auth/useAuth";
import { saveFormFields, updateFormTitle } from "../services/formsService";

function useSaveForm(formId) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values) => {
      await saveFormFields(formId, values.fields);
      await updateFormTitle(formId, values.title);

      return values;
    },

    onSuccess: (values) => {
      queryClient.setQueryData(["forms", user.id], (old) =>
        old?.map((form) =>
          form.id === formId
            ? {
                ...form,
                title: values.title,
              }
            : form,
        ),
      );

      queryClient.invalidateQueries({
        queryKey: ["forms", user.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["form", formId],
      });
      queryClient.invalidateQueries({
        queryKey: ["form_fields", formId],
      });
    },
  });
}

export default useSaveForm;

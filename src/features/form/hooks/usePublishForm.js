/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../Auth/useAuth";
import { publishForm } from "../services/formsService";

function usePublishForm(formId) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => publishForm(formId),

    onSuccess: (publicId) => {
      queryClient.setQueryData(["forms", user.id], (old) =>
        old?.map((form) =>
          form.id === formId
            ? {
                ...form,
                is_published: true,
                public_id: publicId,
              }
            : form,
        ),
      );

      queryClient.invalidateQueries({
        queryKey: ["forms", user.id],
      });

      return publicId;
    },
  });
}

export default usePublishForm;

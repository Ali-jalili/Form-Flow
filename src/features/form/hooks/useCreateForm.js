/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../Auth/useAuth";
import { createForm } from "../services/formsService";

function useCreateForm() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => createForm(user.id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["forms", user.id],
      });
    },
  });

  return mutation;
}

export default useCreateForm;

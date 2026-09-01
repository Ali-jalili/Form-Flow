/** @format */

import { useMutation } from "@tanstack/react-query";

import { submitResponse } from "../services/formsService";

function useSubmitResponse() {
  return useMutation({
    mutationFn: ({ formId, answers }) => submitResponse(formId, answers),
  });
}

export default useSubmitResponse;

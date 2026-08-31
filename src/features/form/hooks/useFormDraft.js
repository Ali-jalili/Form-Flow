/** @format */

import { useCallback, useEffect, useMemo } from "react";

function useFormDraft(formId, watch) {
  const draftKey = useMemo(
    () => (formId ? `form-draft-${formId}` : null),
    [formId],
  );

  const getDraft = useCallback(() => {
    if (!draftKey) return null;

    const draft = localStorage.getItem(draftKey);

    if (!draft) return null;

    try {
      return JSON.parse(draft);
    } catch {
      return null;
    }
  }, [draftKey]);

  const formValues = watch();

  useEffect(() => {
    if (!draftKey) return;

    const timer = setTimeout(() => {
      localStorage.setItem(draftKey, JSON.stringify(formValues));
    }, 500);

    return () => clearTimeout(timer);
  }, [draftKey, formValues]);

  const clearDraft = useCallback(() => {
    if (!draftKey) return;

    localStorage.removeItem(draftKey);
  }, [draftKey]);

  return {
    clearDraft,
    getDraft,
  };
}

export default useFormDraft;

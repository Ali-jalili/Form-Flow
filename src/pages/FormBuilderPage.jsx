/** @format */

import { useEffect, useState, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import useAuth from "../features/Auth/useAuth";
import useFormData from "../features/form/hooks/useFormData";
import useFormFields from "../features/form/hooks/useFormFields";
import useFormDraft from "../features/form/hooks/useFormDraft";
import useSaveForm from "../features/form/hooks/useSaveForm";
import usePublishForm from "../features/form/hooks/usePublishForm";

import FormBuilderHeader from "../features/form/components/FormBuilderHeader";
import PublishedFormBanner from "../features/form/components/PublishedFormBanner";
import FormFieldsEditor from "../features/form/components/FormFieldsEditor";
import FormPreview from "../features/form/components/FormPreview";

import Spinner from "../components/ui/Spinner";

const DEFAULT_FORM_VALUES = {
  title: "",
  fields: [],
};

function isDraftDifferentFromServer(draft, serverValues) {
  if (!draft) return false;

  const normalize = (val) => JSON.stringify(val || {});

  const draftNormalized = {
    title: (draft.title || "").trim(),
    fields: (draft.fields || []).map((f) => ({
      id: f.id,
      type: f.type,
      label: f.label,
      required: !!f.required,
      options: f.options || [],
    })),
  };

  const serverNormalized = {
    title: (serverValues.title || "").trim(),
    fields: (serverValues.fields || []).map((f) => ({
      id: f.id,
      type: f.type,
      label: f.label,
      required: !!f.required,
      options: f.options || [],
    })),
  };

  return normalize(draftNormalized) !== normalize(serverNormalized);
}

function FormBuilderPage() {
  const { formId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showPreview, setShowPreview] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState(null);
  const [isDraftActive, setIsDraftActive] = useState(false);

  const formMethods = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "onChange",
  });

  const {
    reset,
    watch,
    getValues,
    handleSubmit,
    formState: { isDirty },
  } = formMethods;

  const title = watch("title");
  const fields = watch("fields");

  const { data: formData, isLoading: formLoading } = useFormData(formId);

  const {
    data: fieldsData,
    isLoading: fieldsLoading,
    isFetched: fieldsFetched,
  } = useFormFields(formId);

  const { clearDraft, getDraft } = useFormDraft(
    formId,
    watch,
    !!formData && fieldsFetched,
  );

  const isFormSavedInDb = useMemo(() => {
    return (
      !!formData &&
      (formData.title !== "Untitled Form" ||
        (fieldsData && fieldsData.length > 0))
    );
  }, [formData, fieldsData]);

  useEffect(() => {
    if (!formId || !fieldsFetched || !formData) return;

    const serverValues = {
      title: formData.title || "",
      fields: fieldsData || [],
    };

    const draft = getDraft();

    const hasRealUnsavedDraft = isDraftDifferentFromServer(draft, serverValues);

    if (hasRealUnsavedDraft) {
      reset(draft);
      setIsDraftActive(true);
    } else {
      clearDraft();
      reset(serverValues);
      setIsDraftActive(false);
    }
  }, [
    formId,
    fieldsFetched,
    formData,
    fieldsData,
    getDraft,
    reset,
    clearDraft,
  ]);

  useEffect(() => {
    if (!formData?.public_id) {
      setPublishedUrl(null);
      return;
    }

    setPublishedUrl(`${window.location.origin}/form/${formData.public_id}`);
  }, [formData?.public_id]);

  useEffect(() => {
    return () => {
      const draft = getDraft();

      if (!draft || !user || !formId) return;

      if (draft.title && draft.title !== formData?.title) {
        queryClient.setQueryData(["forms", user.id], (old) =>
          old?.map((form) =>
            form.id === formId
              ? {
                  ...form,
                  title: draft.title,
                }
              : form,
          ),
        );
      }
    };
  }, [getDraft, formData?.title, formId, queryClient, user]);

  const { mutateAsync: saveForm, isPending: isSaving } = useSaveForm(formId);

  const hasUnsavedChanges = isDirty || isDraftActive;
  const showUnsaved = !isFormSavedInDb || hasUnsavedChanges;

  async function handleSave() {
    const values = getValues();

    try {
      await saveForm(values);

      clearDraft();
      setIsDraftActive(false);
      reset(values);

      toast.success("Form saved successfully!");
    } catch {
      toast.error("Failed to save form. Please try again.");
    }
  }

  const { mutateAsync: publish, isPending: isPublishing } =
    usePublishForm(formId);

  async function handlePublish() {
    const values = getValues();

    if (!values.fields.length) {
      toast.error("Add at least one field before publishing.");
      return;
    }

    if (hasUnsavedChanges) {
      toast.error("Save your form before publishing.");
      return;
    }

    try {
      const publicId = await publish();

      clearDraft();
      setIsDraftActive(false);

      setPublishedUrl(`${window.location.origin}/form/${publicId}`);

      toast.success("Form published successfully!");
    } catch {
      toast.error("Failed to publish form.");
    }
  }

  const canPublish =
    fields.length > 0 && !hasUnsavedChanges && isFormSavedInDb && !isPublishing;

  if ((fieldsLoading || formLoading) && formId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50/30">
        <Spinner />
      </div>
    );
  }

  return (
    <FormProvider {...formMethods}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/20">
        <FormBuilderHeader
          title={title}
          onTitleChange={(newTitle) =>
            formMethods.setValue("title", newTitle, {
              shouldDirty: true,
            })
          }
          onBack={() => navigate(-1)}
          onPreviewToggle={() => setShowPreview((current) => !current)}
          onSave={handleSubmit(handleSave)}
          onPublish={handlePublish}
          isSaving={isSaving}
          isPublishing={isPublishing}
          isDirty={showUnsaved}
          canPublish={canPublish}
        />

        <PublishedFormBanner
          publishedUrl={publishedUrl}
          onDismiss={() => setPublishedUrl(null)}
        />

        <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-7xl flex-col lg:flex-row">
          {/* Form Builder */}
          <div
            className={`${
              showPreview ? "hidden lg:flex" : "flex"
            } min-w-0 flex-1`}
          >
            <FormFieldsEditor />
          </div>

          {/* Live Preview */}
          <div
            className={`${
              showPreview ? "flex" : "hidden lg:flex"
            } min-w-0 flex-1`}
          >
            <FormPreview />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

export default FormBuilderPage;

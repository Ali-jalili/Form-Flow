/** @format */

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import useAuth from "../features/Auth/useAuth";
import useFormFields from "../features/form/hooks/useFormFields";
import useFormDraft from "../features/form/hooks/useFormDraft";
import useFormData from "../features/form/hooks/useForm";
import {
  publishForm,
  saveFormFields,
  updateFormTitle,
} from "../features/form/services/formsService";

import FormBuilderHeader from "../features/form/components/FormBuilderHeader";
import PublishedFormBanner from "../features/form/components/PublishedFormBanner";
import FormFieldsEditor from "../features/form/components/FormFieldsEditor";
import FormPreview from "../features/form/components/FormPreview";

import Spinner from "../components/ui/Spinner";

const DEFAULT_FORM_VALUES = {
  title: "",
  fields: [],
};

function FormBuilderPage() {
  const { formId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState(null);

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
  // Load initial form data.
  useEffect(() => {
    if (!formId || !fieldsFetched || !formData) return;

    const draft = getDraft();

    if (draft) {
      reset(draft);
      return;
    }

    reset({
      title: formData.title || "",
      fields: fieldsData || [],
    });
  }, [formId, fieldsFetched, formData, fieldsData, getDraft, reset]);

  // Build published form URL.
  useEffect(() => {
    if (!formData?.public_id) {
      setPublishedUrl(null);
      return;
    }

    setPublishedUrl(`${window.location.origin}/form/${formData.public_id}`);
  }, [formData?.public_id]);

  // Keep the forms list cache in sync with an unsaved draft.
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

  async function handleSave() {
    const values = getValues();

    setIsSaving(true);

    try {
      await saveFormFields(formId, values.fields);
      await updateFormTitle(formId, values.title);

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

      reset(values);
      clearDraft();

      toast.success("Form saved successfully!");
    } catch {
      toast.error("Failed to save form. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handlePublish() {
    const values = getValues();

    if (!values.fields.length) {
      toast.error("Add at least one field before publishing.");
      return;
    }

    if (isDirty) {
      toast.error("Save your form before publishing.");
      return;
    }

    setIsPublishing(true);

    try {
      const publicId = await publishForm(formId);

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

      clearDraft();

      setPublishedUrl(`${window.location.origin}/form/${publicId}`);

      toast.success("Form published successfully!");
    } catch {
      toast.error("Failed to publish form.");
    } finally {
      setIsPublishing(false);
    }
  }

  const canPublish = !isDirty && !isPublishing && fields.length > 0;

  if ((fieldsLoading || formLoading) && formId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50/30">
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
          isDirty={isDirty}
          canPublish={canPublish}
        />

        <PublishedFormBanner
          publishedUrl={publishedUrl}
          onDismiss={() => setPublishedUrl(null)}
        />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row h-[calc(100vh-3.5rem)]">
          <div className={`${showPreview ? "hidden lg:flex" : "flex"} flex-1`}>
            <FormFieldsEditor />
          </div>

          <div className={`${showPreview ? "flex" : "hidden lg:flex"} flex-1`}>
            <FormPreview />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

export default FormBuilderPage;

/** @format */

import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { FileText, Grip, Plus, Sparkles, WandSparkles } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

import SortableField from "./SortableField";
import AddFieldSelect from "./AddFieldSelect";

function FormFieldsEditor() {
  const { control } = useFormContext();

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "fields",
  });

  function addField(type) {
    append({
      id: crypto.randomUUID(),
      type,
      label: "",
      required: false,
      options: type === "multiple_choice" ? [""] : [],
      order: fields.length + 1,
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = fields.findIndex((field) => field.id === active.id);

    const newIndex = fields.findIndex((field) => field.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    move(oldIndex, newIndex);
  }

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-gradient-to-b from-gray-50/80 via-white to-white lg:border-r lg:border-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-gray-100 bg-white/85 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <WandSparkles className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-gray-900">
                Build your form
              </h2>

              <p className="mt-0.5 text-xs text-gray-400">
                Add, edit and organize your fields
              </p>
            </div>
          </div>

          {fields.length > 0 && (
            <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-500 shadow-sm">
              <FileText className="h-3.5 w-3.5 text-indigo-500" />

              <span>
                {fields.length} {fields.length === 1 ? "field" : "fields"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Fields */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
        {fields.length === 0 ? (
          <EmptyFieldsState />
        ) : (
          <DndContext onDragEnd={handleDragEnd}>
            <SortableContext items={fields.map((field) => field.id)}>
              <div className="mx-auto max-w-3xl space-y-4 pb-8">
                {fields.map((field, index) => (
                  <div key={field.id} className="group relative">
                    <SortableField
                      field={field}
                      index={index}
                      control={control}
                      remove={remove}
                    />
                  </div>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Add Field */}
      <div className="sticky bottom-0 z-10 border-t border-gray-100 bg-white/90 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
                <Plus className="h-3 w-3" />
              </div>
              Add a field
            </div>

            {fields.length > 0 && (
              <span className="hidden text-[11px] text-gray-400 sm:block">
                Drag fields to reorder
              </span>
            )}
          </div>

          <AddFieldSelect onAddField={addField} />
        </div>
      </div>
    </section>
  );
}

function EmptyFieldsState() {
  return (
    <div className="flex min-h-[55vh] items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Illustration */}
        <div className="relative mx-auto mb-7 flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-indigo-100/50 blur-xl" />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-purple-50 shadow-sm">
            <Sparkles className="h-8 w-8 text-indigo-500" />

            <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-indigo-600 shadow-sm">
              <Plus className="h-3.5 w-3.5 text-white" />
            </div>
          </div>
        </div>

        {/* Copy */}
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-indigo-600">
            <Sparkles className="h-3 w-3" />
            Let&apos;s get started
          </span>

          <h3 className="mt-4 text-xl font-bold tracking-tight text-gray-900">
            Your form is empty
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
            Start by adding your first question. You can customize it and
            rearrange your fields anytime.
          </p>
        </div>

        {/* Hint */}
        <div className="mx-auto mt-7 flex w-fit items-center gap-2 rounded-xl border border-gray-100 bg-white px-4 py-2.5 text-xs text-gray-400 shadow-sm">
          <Grip className="h-3.5 w-3.5" />
          <span>Add multiple fields and drag to reorder</span>
        </div>
      </div>
    </div>
  );
}

export default FormFieldsEditor;

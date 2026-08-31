/** @format */

import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Grip, Plus, Sparkles } from "lucide-react";
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
      options: type === "multiple_choice" ? ["Option 1"] : [],
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

  function handleDelete(index) {
    remove(index);
  }

  return (
    <section className="flex flex-1 flex-col bg-white lg:border-r border-gray-100 min-w-0">
      {/* Editor Header */}
      <div className="border-b border-gray-100 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Form fields</h2>

            <p className="mt-0.5 text-xs text-gray-400">
              Build and organize your form
            </p>
          </div>

          {fields.length > 0 && (
            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
              {fields.length} {fields.length === 1 ? "field" : "fields"}
            </span>
          )}
        </div>
      </div>

      {/* Fields */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {fields.length === 0 ? (
          <EmptyFieldsState />
        ) : (
          <DndContext onDragEnd={handleDragEnd}>
            <SortableContext items={fields.map((field) => field.id)}>
              <div className="mx-auto max-w-3xl space-y-3 pb-6">
                {fields.map((field, index) => (
                  <div key={field.id} className="relative">
                    <div className="absolute -left-3 top-5 z-10 hidden -translate-x-full sm:block">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-[11px] font-semibold text-gray-400">
                        {index + 1}
                      </span>
                    </div>

                    <SortableField
                      field={field}
                      index={index}
                      control={control}
                      remove={handleDelete}
                    />
                  </div>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Add Field */}
      <div className="sticky bottom-0 border-t border-gray-100 bg-white/90 p-4 backdrop-blur-md sm:p-5 lg:p-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-gray-500">
            <Plus className="h-3.5 w-3.5" />
            Add a field
          </div>

          <AddFieldSelect onAddField={addField} />
        </div>
      </div>
    </section>
  );
}

function EmptyFieldsState() {
  return (
    <div className="flex min-h-[55vh] items-center justify-center">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50">
          <Sparkles className="h-9 w-9 text-indigo-500" />
        </div>

        <h3 className="text-lg font-semibold text-gray-900">
          Start building your form
        </h3>

        <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-gray-500">
          Add your first field using the button below. You can reorder fields
          anytime by dragging them.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-400">
          <Grip className="h-3.5 w-3.5" />
          Drag to reorder fields
        </div>
      </div>
    </div>
  );
}

export default FormFieldsEditor;

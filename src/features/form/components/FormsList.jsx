/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Plus, Search, Layers } from "lucide-react";

import useAuth from "../../Auth/useAuth";
import { createForm } from "../services/formsService";
import FormCard from "./FormCard";

function FormsList({ data }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState("all"); // 'all' | 'published' | 'draft'

  async function handleCreateForm() {
    if (isCreating) return;
    setIsCreating(true);

    try {
      const newForm = await createForm(user.id);
      await queryClient.invalidateQueries({
        queryKey: ["forms", user.id],
      });
      navigate(`/builder/${newForm.id}`);
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
      setIsCreating(false);
    }
  }

  // فیلتر و سرچ فرم‌ها
  const filteredData = data.filter((form) => {
    const matchesSearch = (form.title || "Untitled Form")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterTab === "all"
        ? true
        : filterTab === "published"
          ? form.is_published
          : !form.is_published;

    return matchesSearch && matchesFilter;
  });

  return (
    <section>
      {/* Forms Header & Actions */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            My Forms
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Create, manage, and publish your forms.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateForm}
          disabled={isCreating}
          className="
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-indigo-600
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-indigo-200
            transition-all
            duration-200
            hover:bg-indigo-700
            hover:shadow-indigo-300
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:opacity-60
            sm:w-auto
          "
        >
          <Plus className="h-4 w-4" />
          New Form
        </button>
      </div>

      {/* Search Bar & Filter Tabs */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        {/* Tab Filters */}
        <div className="flex items-center rounded-xl border border-slate-200/80 bg-white p-1 shadow-sm">
          {[
            { id: "all", label: `All (${data.length})` },
            { id: "published", label: "Published" },
            { id: "draft", label: "Drafts" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id)}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
                filterTab === tab.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search forms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200/90 bg-white py-2 pl-9 pr-4 text-xs outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>
      </div>

      {/* Forms Grid */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((item) => (
            <FormCard key={item.id} dataForm={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <Layers className="h-8 w-8 text-slate-300" />
          <p className="mt-3 text-sm font-semibold text-slate-700">
            No forms found
          </p>
          <p className="mt-1 text-xs text-slate-400">
            No forms match your search or filter criteria.
          </p>
        </div>
      )}
    </section>
  );
}

export default FormsList;

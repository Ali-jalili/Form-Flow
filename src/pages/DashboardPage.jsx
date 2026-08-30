/** @format */

import useForms from "../features/form-builder/hooks/useForms";
import ErrorMessage from "../components/ui/ErrorMessage";

import EmptyState from "../components/EmptyState";

import Spinner from "../components/ui/Spinner";
import FormsList from "../components/FormsList";

function DashboardPage() {
  const { data, isLoading, error } = useForms();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (data.length === 0) return <EmptyState />;

  return <FormsList data={data} />;
}

export default DashboardPage;

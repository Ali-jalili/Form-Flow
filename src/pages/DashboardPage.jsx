/** @format */

import useForms from "../features/form-builder/hooks/useForms";
import Spinner from "../ui/Spinner";
import ErrorMessage from "../ui/components/ErrorMessage";

import EmptyState from "../ui/components/EmptyState";
import FormsList from "../ui/components/FormsList";

function DashboardPage() {
  const { data, isLoading, error } = useForms();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (data.length === 0) return <EmptyState />;

  return <FormsList data={data} />;
}

export default DashboardPage;

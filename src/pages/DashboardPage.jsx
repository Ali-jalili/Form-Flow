/** @format */

import useForms from "../features/form/hooks/useForms";
import ErrorMessage from "../components/ui/ErrorMessage";

import Spinner from "../components/ui/Spinner";
import EmptyState from "../features/form/components/EmptyState";
import FormsList from "../features/form/components/FormsList";

function DashboardPage() {
  const { data, isLoading, error } = useForms();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (data.length === 0) return <EmptyState />;

  return <FormsList data={data} />;
}

export default DashboardPage;

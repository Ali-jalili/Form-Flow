/** @format */

import useForms from "../features/form-builder/hooks/useForms";
import Spinner from "../ui/Spinner";

function DashboardPage() {
  const { data, isLoading, error } = useForms();

  if (isLoading) return <Spinner />;
  if (error) return <div>{error.message}</div>;
  if (data.length === 0)
    return (
      <div>
        <h2> No forms yet</h2>
        <p>Create your first form and start collecting responses</p>
        <button> {} </button>
      </div>
    );

  return <div>لیست فرم‌ها</div>;
}

export default DashboardPage;

/** @format */

import useForms from "../features/form-builder/hooks/useForms";
import Spinner from "../ui/Spinner";

function DashboardPage() {
  const { data, isLoading, error } = useForms;

  return (
    <div>
      {isLoading && <Spinner />}

      <h1>DashboardPage</h1>
    </div>
  );
}

export default DashboardPage;

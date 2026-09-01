/** @format */

import { Navigate } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";
import useAuth from "../../features/Auth/useAuth";

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Spinner />;
  if (!user) return <Navigate to="/login" />;

  return children;
}

export default ProtectedRoute;

/** @format */

import { Navigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import useAuth from "./useAuth";

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Spinner />;
  if (!user) return <Navigate to="/login" />;

  return children;
}

export default ProtectedRoute;

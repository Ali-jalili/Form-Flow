/** @format */

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Auth/useAuth";
import { getFormsByUser } from "../services/formsService";

function useForms() {
  const { user } = useAuth();

  const userId = user?.id;

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["forms", userId],
    queryFn: () => getFormsByUser(userId),
    enabled: !!userId,
  });

  return { data, isLoading, error };
}

export default useForms;

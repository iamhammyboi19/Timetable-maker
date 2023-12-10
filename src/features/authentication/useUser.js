import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuths";

// gets current user and return isLoading, isAuthenticated and the user's timetable
// refer to the getCurrentUser function in services/apiAuths
export function useUser() {
  const {
    data: user,
    isLoading,
    fetchStatus,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
  });

  const loadingUser = isLoading && fetchStatus === "fetching";

  return {
    loadingUser,
    isAuthenticated: user?.role === "authenticated",
    userTimetables: user?.user_metadata?.timetables,
    user_metadata: user?.user_metadata,
    email: user?.email,
  };
}

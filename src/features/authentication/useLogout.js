import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOutUser } from "../../services/apiAuths";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logoutUser, isLoading: isLoggingOutUser } = useMutation({
    mutationFn: signOutUser,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { logoutUser, isLoggingOutUser };
}

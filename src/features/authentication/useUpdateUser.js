import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiAuths";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateCurrentUser, isLoading: isUpdatingUser } = useMutation({
    mutationFn: updateUser,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user?.user);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateCurrentUser, isUpdatingUser };
}

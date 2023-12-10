import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetpassword } from "../../services/apiAuths";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useResetPassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: resetpassword,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user?.user);
      // toast.success("New password successfully created", { duration: 4000 });
      navigate("/", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { mutate, isLoading };
}

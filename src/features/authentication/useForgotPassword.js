import { useMutation } from "@tanstack/react-query";
import { forgotpassword } from "../../services/apiAuths";
import toast from "react-hot-toast";

export function useForgotPassword() {
  const { mutate, isLoading } = useMutation({
    mutationFn: forgotpassword,
    onSuccess: () => {
      toast.success("Please check your email address to reset your password", {
        duration: 5000,
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isLoading };
}

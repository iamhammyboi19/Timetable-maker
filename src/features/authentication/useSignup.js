import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserAccount } from "../../services/apiAuths";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signupUser, isLoading: isSigningupUser } = useMutation({
    mutationFn: createUserAccount,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user?.user);
      toast.success(
        "User successfully created. Please confirm your email address to proceed",
        { duration: 6000 }
      );
      navigate("/confirmaccount", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signupUser, isSigningupUser };
}

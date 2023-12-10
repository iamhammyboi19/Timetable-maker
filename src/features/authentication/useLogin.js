import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUserAccount } from "../../services/apiAuths";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: loginUser, isLoading: isLoggingUser } = useMutation({
    mutationFn: loginUserAccount,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user?.user);
      navigate("/timetable", { replace: true });
    },
    onError: (err) => {
      console.log("loginerrfromReactquery", err);
      toast.error(err.message);
    },
  });

  return { loginUser, isLoggingUser };
}

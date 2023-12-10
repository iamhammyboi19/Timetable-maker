import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserTimetableData } from "../../services/apiAuths";

export function useUpdateTimetableData() {
  const queryClient = useQueryClient();
  const { mutate: updateTimetable, isLoading: isUpdatingTimetable } =
    useMutation({
      mutationFn: updateUserTimetableData,
      onSuccess: (user) => {
        queryClient.setQueryData(["user"], user.user);
      },
    });
  return { updateTimetable, isUpdatingTimetable };
}

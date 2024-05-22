import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateCurrentUser, isPending } = useMutation({
    mutationFn: updateCurrentUserAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Successfully updated");
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateCurrentUser, isPending };
}

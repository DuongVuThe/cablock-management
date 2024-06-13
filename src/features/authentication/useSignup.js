import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupAPI,
    onSuccess: (data) => {
      toast.success(
        "Account created. Please verify your account through your email address"
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signup, isPending };
}

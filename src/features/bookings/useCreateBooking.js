import { useMutation } from "@tanstack/react-query";
import { createBooking as createBookingAPI } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCreateBooking() {
  const { mutate: createBooking, isPending: isCreating } = useMutation({
    mutationFn: createBookingAPI,
    onSuccess: () => {
      toast.success("Successfully added new booking");
    },
    onError: (err) => toast.error(err.message),
  });

  return { createBooking, isCreating };
}

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookedDatesByCabinId } from "../../services/apiBookings";

export function useBookedDate() {
  const [searchParams] = useSearchParams();
  const cabinId = Number(searchParams.get("cabinId"));

  const { isPending, data: bookedDates } = useQuery({
    queryKey: ["booked-date", ...(cabinId ? [cabinId] : [])],
    queryFn: () => getBookedDatesByCabinId(cabinId),
  });

  return { bookedDates, isPending };
}

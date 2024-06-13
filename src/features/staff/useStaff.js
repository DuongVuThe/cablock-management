import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/apiAuth";

export function useStaff() {
  const { isPending, data } = useQuery({
    queryKey: ["staff"],
    queryFn: getAllUsers,
  });

  return { isPending, data };
}

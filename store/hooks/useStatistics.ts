import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/store/redux/hooks";
import { getStatistics } from "@/domain/usecases/TransactionsUseCases";

export function useStatistics() {
  const user = useAppSelector((state) => state.auth.user);

  const { isLoading, data: statistics } = useQuery({
    queryKey: ["statistics"],
    queryFn: () => getStatistics(user?.uid ?? ""),
    enabled: !!user?.uid,
  });

  return {
    isLoading,
    statistics,
  };
}

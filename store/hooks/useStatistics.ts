import { getBalance } from "@/domain/usecases/BalanceUseCases";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { userAuthState } from "../atoms/authAtoms";
import { getStatistics } from "@/domain/usecases/TransactionsUseCases";

export function useStatistics() {
  const user = useRecoilValue(userAuthState);
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

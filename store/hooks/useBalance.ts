import { getBalance } from "@/domain/usecases/BalanceUseCases";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../redux/hooks";

export function useBalance() {
  const user = useAppSelector((state) => state.auth.user);

  const { isLoading, data: balance } = useQuery({
    queryKey: ["balanceInfo"],
    queryFn: () => getBalance(user?.uid ?? ""),
    enabled: !!user?.uid,
  });

  return {
    isLoading,
    balance: balance ?? 0,
  };
}

import { getBalance } from "@/domain/usecases/BalanceUseCases";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { userAuthState } from "../atoms/authAtoms";

export function useBalance() {
  const user = useRecoilValue(userAuthState);
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

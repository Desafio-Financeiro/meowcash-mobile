import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  transactionsFilterState,
  transactionsState,
} from "../atoms/transactionAtoms";
import { getTransactions } from "@/domain/usecases/TransactionsUseCases";
import { userAuthState } from "../atoms/authAtoms";
import { useEffect } from "react";

export function useTransactionList() {
  const transactionFilter = useRecoilValue(transactionsFilterState);
  const user = useRecoilValue(userAuthState);
  const [transactions, setTransactions] = useRecoilState(transactionsState);

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["transactions", transactionFilter],
    queryFn: ({ pageParam }) =>
      getTransactions(user?.uid ?? "", pageParam, transactionFilter),
    getNextPageParam: (lastPage) =>
      lastPage?.data && lastPage?.data?.length > 0
        ? lastPage?.lastDoc
        : undefined,
    initialPageParam: null,
    enabled: !!user?.uid,
  });

  useEffect(() => {
    const transactionList = data?.pages?.map((page) => page?.data || []).flat();
    if (transactionList?.length) {
      setTransactions(transactionList);
    }
  }, [isLoading, data]);

  return {
    transactions,
    isLoading,
    fetchNextPage,
    hasNextPage,
  };
}

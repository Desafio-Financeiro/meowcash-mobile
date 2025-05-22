import { useInfiniteQuery } from "@tanstack/react-query";
import { getTransactions } from "@/domain/usecases/TransactionsUseCases";
import { useAppDispatch, useAppSelector } from "@/store/redux/hooks";
import { setTransactions } from "@/store/redux/slices/transactionSlice";
import { useEffect } from "react";

export function useTransactionList() {
  const dispatch = useAppDispatch();
  const transactionFilter = useAppSelector(
    (state) => state.transactions.filter
  );
  const transactions = useAppSelector((state) => state.transactions.list);
  const user = useAppSelector((state) => state.auth.user);

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
      dispatch(setTransactions(transactionList));
    }
  }, [isLoading, data]);

  return {
    transactions,
    isLoading,
    fetchNextPage,
    hasNextPage,
  };
}

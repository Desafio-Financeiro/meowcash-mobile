import type { Transaction } from "@/components/Transactions/TransactionItem";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  QueryObserverResult,
  RefetchOptions,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { getTransactions } from "@/api/transaction";

interface ITransactionsContext {
  transactions: Transaction[];
  isLoading: boolean;
  hasNextPage: boolean;
  fetchNextPage: (options?: FetchNextPageOptions) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<
        | {
            data: Transaction[];
            lastDoc: any;
          }
        | undefined,
        unknown
      >,
      Error
    >
  >;
  refetchTransactions: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      InfiniteData<
        | {
            data: Transaction[];
            lastDoc: any;
          }
        | undefined,
        unknown
      >,
      Error
    >
  >;
}

const TransactionsContext = createContext<ITransactionsContext | undefined>(
  undefined
);

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ["transactions"],
    queryFn: ({ pageParam }) => getTransactions(user?.uid || "", pageParam),
    getNextPageParam: (lastPage) =>
      lastPage?.data && lastPage?.data?.length > 0
        ? lastPage?.lastDoc
        : undefined,
    initialPageParam: null,
    enabled: !!user?.uid,
  });

  useEffect(() => {
    if (!isLoading && data?.pages[0]) {
      setTransactions(
        data?.pages?.map((page) => page?.data || []).flat() || []
      );
    }
  }, [isLoading, data]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        isLoading: isLoading || isFetchingNextPage || isRefetching,
        fetchNextPage,
        hasNextPage,
        refetchTransactions: refetch,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      "Contexto não encontrado, useTransactions deve estar dentro de TransactionsProvider"
    );
  }
  return context;
};

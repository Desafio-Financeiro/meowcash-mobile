import type { Transaction } from "@/components/transactions/TransactionItem";
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
import { deleteTransaction, getTransactions } from "@/api/transaction";
import { Alert } from "react-native";
import { getBalance } from "@/api/balance";

interface ITransactionsContext {
  balance: number;
  transactions: Transaction[];
  isLoading: boolean;
  balanceIsLoading: boolean;
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
  refetchBalance: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
  showDeleteAlert: (transaction: Transaction) => void;
}

const TransactionsContext = createContext<ITransactionsContext | undefined>(
  undefined
);

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const {
    isLoading: balanceIsLoading,
    data: balance,
    refetch: refetchBalance,
    isRefetching: balanceIsRefetching,
  } = useQuery({
    queryKey: ["balanceInfo"],
    queryFn: () => getBalance(user?.uid || ""),
    enabled: !!user?.uid,
  });

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

  const showDeleteAlert = (transaction: Transaction) => {
    Alert.alert(
      "Deletar transação",
      "Tem certeza de que deseja deletar esta transação?",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Deletar",
          onPress: () => {
            deleteTransaction(transaction).then(() => {
              refetch();
              refetchBalance();
            });
          },
        },
      ]
    );
  };

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
        balance,
        transactions,
        isLoading: isLoading || isFetchingNextPage || isRefetching,
        balanceIsLoading: balanceIsLoading || balanceIsRefetching,
        fetchNextPage,
        hasNextPage,
        refetchTransactions: refetch,
        refetchBalance,
        showDeleteAlert,
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

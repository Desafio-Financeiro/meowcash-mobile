import type { Transaction } from "@/app/components/transactions/TransactionItem";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
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
import { Alert } from "react-native";
import { GroupedTransaction } from "@/utils/groupTransactionsByMonth";
import { Filter } from "@/utils/types";
import { getBalance } from "@/domain/usecases/BalanceUseCases";
import {
  deleteTransaction,
  getStatistics,
  getTransactions,
} from "@/domain/usecases/TransactionsUseCases";

interface ITransactionsContext {
  balance: number;
  transactions: Transaction[];
  isLoading: boolean;
  balanceIsLoading: boolean;
  hasNextPage: boolean;
  statistics?: {
    credit: number;
    debit: number;
    groupedTransactions: GroupedTransaction[];
  };
  statisticsIsLoading: boolean;
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
  refetchStatistics: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      | {
          credit: number;
          debit: number;
        }
      | undefined,
      Error
    >
  >;
  transactionFilter: Filter;
  setTransactionFilter: (filter: Filter) => void;
  handleClearFilter: () => void;
}

const TransactionsContext = createContext<ITransactionsContext | undefined>(
  undefined
);

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionFilter, setTransactionFilter] = useState<Filter>({
    date: {
      start: null,
      end: null,
    },
    transactionType: null,
    hasAttachment: null,
    transactionText: null,
  });

  function handleClearFilter() {
    setTransactionFilter({
      date: {
        start: null,
        end: null,
      },
      transactionType: null,
      hasAttachment: null,
      transactionText: null,
    });
  }

  const {
    isLoading: balanceIsLoading,
    data: balance,
    refetch: refetchBalance,
    isRefetching: balanceIsRefetching,
  } = useQuery({
    queryKey: ["balanceInfo"],
    queryFn: () => getBalance(user?.uid ?? ""),
    enabled: !!user?.uid,
  });

  const {
    isLoading: statisticsIsLoading,
    data: statistics,
    refetch: refetchStatistics,
    isRefetching: statisticsIsRefetching,
  } = useQuery({
    queryKey: ["statistics"],
    queryFn: () => getStatistics(user?.uid ?? ""),
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
              refetchStatistics();
            });
          },
        },
      ]
    );
  };

  useEffect(() => {
    if (!isLoading && data?.pages) {
      setTransactions(
        data?.pages?.map((page) => page?.data || []).flat() || []
      );
    }
  }, [isLoading, data]);

  const memoizedValue = useMemo(() => {
    return {
      balance: balance ?? 0,
      transactions,
      isLoading: isLoading || isFetchingNextPage || isRefetching,
      balanceIsLoading: balanceIsLoading || balanceIsRefetching,
      fetchNextPage,
      hasNextPage,
      refetchTransactions: refetch,
      refetchBalance,
      showDeleteAlert,
      statistics,
      statisticsIsLoading: statisticsIsLoading || statisticsIsRefetching,
      refetchStatistics,
      transactionFilter,
      setTransactionFilter,
      handleClearFilter,
    };
  }, [
    balance,
    transactions,
    isLoading,
    isFetchingNextPage,
    isRefetching,
    balanceIsLoading,
    balanceIsRefetching,
    fetchNextPage,
    hasNextPage,
    refetch,
    refetchBalance,
    showDeleteAlert,
    statistics,
    statisticsIsLoading,
    statisticsIsRefetching,
    refetchStatistics,
    transactionFilter,
    setTransactionFilter,
    handleClearFilter,
  ]);

  return (
    <TransactionsContext.Provider value={memoizedValue}>
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

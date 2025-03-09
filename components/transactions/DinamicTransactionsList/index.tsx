import { useState, useEffect } from "react";
import DinamicList from "@/components/DinamicList";
import TransactionItem from "@/components/transactions/TransactionItem";
import { useTransactions } from "@/context/TransactionsContext";
import { TransactionFilters } from "../filters";
import { View } from "react-native";

const DinamicTransactionsList = () => {
  const { transactions, isLoading, fetchNextPage, hasNextPage } =
    useTransactions();
  const [transactionsList, setTransactionsList] = useState<
    { id: string; body: React.ReactNode }[]
  >([]);
  const [page, setPage] = useState(1);
  const [transactionDate, setTransactionDate] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: new Date(),
    end: new Date(),
  });
  const [transactionFilter, setTransactionFilter] = useState("");

  const [loading, setLoading] = useState(false);

  const processTransactions = () => {
    const transactionsList =
      transactions?.map((transaction) => {
        return {
          id: transaction.id as string,
          body: (
            <TransactionItem
              transaction={transaction}
              edit={() => {}}
              exclude={() => {}}
            />
          ),
        };
      }) || [];

    setTransactionsList(transactionsList);
  };

  useEffect(() => {
    if (!isLoading && transactions) {
      processTransactions();
    }
  }, [isLoading, transactions]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <TransactionFilters
          handleTransactionDate={(date) => setTransactionDate(date)}
          handleTransactionFilter={(filter) => setTransactionFilter(filter)}
        />
      </View>

      <DinamicList
        data={transactionsList}
        onLoadMore={fetchNextPage}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
      />
    </View>
  );
};

export default DinamicTransactionsList;

import { useState, useEffect } from "react";
import DinamicList from "@/components/DinamicList";
import TransactionItem from "@/components/Transactions/TransactionItem";
import { useTransactions } from "@/context/TransactionsContext";

const DinamicTransactionsList = () => {
  const { transactions, isLoading, fetchNextPage, hasNextPage } =
    useTransactions();
  const [transactionsList, setTransactionsList] = useState<
    { id: string; body: React.ReactNode }[]
  >([]);

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
    <DinamicList
      data={transactionsList}
      onLoadMore={fetchNextPage}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
    />
  );
};

export default DinamicTransactionsList;

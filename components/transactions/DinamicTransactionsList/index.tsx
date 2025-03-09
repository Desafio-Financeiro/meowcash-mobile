import { useState, useEffect } from "react";
import DinamicList from "@/components/DinamicList";
import { transactionsMOCK } from "@/components/transactions/mock";
import TransactionItem from "@/components/transactions/TransactionItem";
import { styles } from "./style";
import { TransactionFilters } from "../filters";

const DinamicTransactionsList = () => {
  const [transactions, setTransactions] = useState<
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

  const fetchTransactions = async () => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      const transactions = transactionsMOCK.map((transaction) => {
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
      });

      setTransactions(transactions);
      setPage(page + 1);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <TransactionFilters
        handleTransactionDate={(date) => setTransactionDate(date)}
        handleTransactionFilter={(filter) => setTransactionFilter(filter)}
      />

      <DinamicList
        data={transactions}
        onLoadMore={fetchTransactions}
        isLoading={loading}
      />
    </>
  );
};

export default DinamicTransactionsList;

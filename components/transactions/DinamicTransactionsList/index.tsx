import { useState, useEffect } from "react";
import DinamicList from "@/components/DinamicList";
import { transactionsMOCK } from "@/components/Transactions/mock";
import TransactionItem from "@/components/Transactions/TransactionItem";
import { styles } from "./style";

const DinamicTransactionsList = () => {
  const [transactions, setTransactions] = useState<
    { id: string; body: React.ReactNode }[]
  >([]);
  const [page, setPage] = useState(1);
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
    <DinamicList
      style={styles.list}
      data={transactions}
      onLoadMore={fetchTransactions}
      isLoading={loading}
    />
  );
};

export default DinamicTransactionsList;

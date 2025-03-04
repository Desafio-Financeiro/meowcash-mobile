import React, { useState, useEffect } from "react";
import { View } from "react-native";
import List from "@/components/list";
import { transactionsMOCK } from "@/components/transactions/mock";
import TransactionItem from "@/components/transactions/item";

const TransactionsList = () => {
  const [roupas, setTransactions] = useState<{ id: string; body: React.ReactNode }[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      const novasTransactions =
        transactionsMOCK.map((transaction) => {
          return {
            id: transaction.id as string,
            body: <TransactionItem transaction={transaction} edit={() => {
            }} exclude={() => {
            }} />
          };
        });

      setTransactions(novasTransactions);
      setPage(page + 1);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <List data={roupas} onLoadMore={fetchTransactions} isLoading={loading} />
    </View>
  );
};

export default TransactionsList;

import React, { useState, useEffect } from "react";
import DinamicList from "@/components/DinamicList";
import TransactionItem, {
  Transaction
} from "@/components/transactions/TransactionItem";
import { useTransactions } from "@/context/TransactionsContext";
import { TransactionFilters } from "../filters";
import { View, Text } from "react-native";
import { styles } from "./style";
import { TransactionForm } from "../TransactionForm";

const DinamicTransactionsList = () => {
  const {
    transactions,
    isLoading,
    fetchNextPage,
    hasNextPage,
    showDeleteAlert,
    transactionFilter,
    setTransactionFilter
  } = useTransactions();
  const [transactionsList, setTransactionsList] = useState<
    { id: string; body: React.ReactNode }[]
  >([]);
  const [page, setPage] = useState(1);
  const [showAddTransactionDialog, setShowAddTransactionDialog] =
    useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<
    Transaction | undefined
  >(undefined);

  useEffect(() => {
    if (transactionToEdit) {
      setShowAddTransactionDialog(true);
    }
  }, [transactionToEdit, setShowAddTransactionDialog]);

  const [transactionDate, setTransactionDate] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: new Date(),
    end: new Date()
  });

  const [loading, setLoading] = useState(false);

  const processTransactions = () => {
    const transactionsList =
      transactions?.map((transaction) => {
        return {
          id: transaction.id as string,
          body: (
            <View style={{ width: "100%" }}>
              <TransactionItem
                transaction={transaction}
                edit={() => {
                  setTransactionToEdit(transaction);
                }}
                exclude={() => {
                  showDeleteAlert(transaction);
                }}
              />
            </View>
          )
        };
      }) || [];

    setTransactionsList(transactionsList);
  };

  useEffect(() => {
    if (!isLoading && transactions) {
      processTransactions();
    }
  }, [isLoading, transactions]);

  return <>
    <TransactionForm
      onClose={() => {
        setShowAddTransactionDialog(false);
        setTransactionToEdit(undefined);
      }}
      open={showAddTransactionDialog}
      transactionToEdit={transactionToEdit}
    />

    <View style={{ paddingHorizontal: 16 }}>
      <TransactionFilters
        handleTransactionDate={(date) => setTransactionFilter({ ...transactionFilter, date: date })}
        handleTransactionType={(filter) => setTransactionFilter({ ...transactionFilter, transactionType: filter })}
        handleTransactionText={(filter) => setTransactionFilter({ ...transactionFilter, transactionText: filter })}
      />
    </View>
    {transactions.length > 0 ? (

      <DinamicList
        data={transactionsList}
        onLoadMore={fetchNextPage}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
      />
    ) : (
      <Text style={styles.emptyHistory}>Não existe histórico de transações</Text>
    )}
  </>;
};

export default DinamicTransactionsList;

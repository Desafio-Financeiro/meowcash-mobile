import React, { useState, useEffect } from "react";
import DinamicList from "@/app/components/DinamicList";
import TransactionItem, {
  Transaction,
} from "@/app/components/transactions/TransactionItem";
import { TransactionFilters } from "../Filters";
import { View, Text } from "react-native";
import { styles } from "./style";
import { TransactionForm } from "../TransactionForm";
import { useTransactionList } from "@/store/hooks/useTransactionList";
import { useTransactionFilters } from "@/store/hooks/useTransactionFilters";
import { useDeleteTransaction } from "@/store/hooks/useDeleteTransaction";

const DinamicTransactionsList = () => {
  const { showDeleteAlert } = useDeleteTransaction();

  const { transactionFilter, setTransactionFilter } = useTransactionFilters();

  const { transactions, isLoading, fetchNextPage, hasNextPage } =
    useTransactionList();

  const [transactionsList, setTransactionsList] = useState<
    { id: string; body: React.ReactNode }[]
  >([]);
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
    <>
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
          handleTransactionDate={(date) =>
            setTransactionFilter({ ...transactionFilter, date: date })
          }
          handleTransactionType={(filter) =>
            setTransactionFilter({
              ...transactionFilter,
              transactionType: filter,
            })
          }
          handleTransactionText={(filter) =>
            setTransactionFilter({
              ...transactionFilter,
              transactionText: filter,
            })
          }
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
        <Text style={styles.emptyHistory}>
          Não existe histórico de transações
        </Text>
      )}
    </>
  );
};

export default DinamicTransactionsList;

import { Transaction } from "@/app/components/transactions/TransactionItem";
import { deleteTransaction } from "@/domain/usecases/TransactionsUseCases";
import { useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { useTransactionFilters } from "./useTransactionFilters";

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  const { transactionFilter } = useTransactionFilters();
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
              queryClient.invalidateQueries({
                queryKey: ["transactions", transactionFilter],
              });
              queryClient.invalidateQueries({
                queryKey: ["balanceInfo"],
              });
              queryClient.invalidateQueries({
                queryKey: ["statistics"],
              });
            });
          },
        },
      ]
    );
  };

  return {
    showDeleteAlert,
  };
}

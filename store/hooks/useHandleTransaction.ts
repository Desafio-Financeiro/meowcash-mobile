import { AddTransactionArgs } from "@/app/components/transactions/TransactionForm";
import { Transaction } from "@/app/components/transactions/TransactionItem";
import {
  addTransaction,
  updateTransaction,
} from "@/domain/usecases/TransactionsUseCases";
import { useState } from "react";
import { useTransactionFilters } from "./useTransactionFilters";
import { useRecoilValue } from "recoil";
import { userAuthState } from "../atoms/authAtoms";
import { useQueryClient } from "@tanstack/react-query";

export function useHandleTransaction() {
  const queryClient = useQueryClient();
  const user = useRecoilValue(userAuthState);

  const { transactionFilter } = useTransactionFilters();
  const [loading, setLoading] = useState<boolean>(false);
  const [transaction, setTransaction] = useState<AddTransactionArgs>({
    type: "Debit",
    value: "0",
    date: new Date(),
    dictKey: "",
  });

  function invalidateQueries() {
    queryClient.invalidateQueries({
      queryKey: ["transactions", transactionFilter],
    });
    queryClient.invalidateQueries({
      queryKey: ["balanceInfo"],
    });
    queryClient.invalidateQueries({
      queryKey: ["statistics"],
    });
  }

  async function createTransaction() {
    if (!user) return;
    return addTransaction({
      type: transaction.type,
      value: parseFloat(transaction.value),
      date: transaction.date,
      to: transaction.type === "Debit" ? transaction.dictKey : null,
      from: transaction.type === "Credit" ? transaction.dictKey : null,
      userId: user.uid,
      attachment: transaction.attachment,
    });
  }

  async function editTransaction(transactionToEdit: Transaction) {
    return updateTransaction({
      ...transactionToEdit,
      type: transaction.type,
      value: parseFloat(transaction.value),
      date: transaction.date,
      to: transaction.type === "Debit" ? transaction.dictKey : null,
      from: transaction.type === "Credit" ? transaction.dictKey : null,
      attachment: transaction.attachment,
    });
  }

  return {
    createTransaction,
    editTransaction,
    transaction,
    setLoading,
    loading,
    setTransaction,
    invalidateQueries,
  };
}

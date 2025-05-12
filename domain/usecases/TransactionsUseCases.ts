import type { Filter } from "@/utils/types";
import { Transaction } from "@/app/components/transactions/TransactionItem";
import { transactionsApi } from "@/infrastructure/api/TransactionsApi";

export const getTransactions = async (
  user: string,
  pageParam?: number | null,
  transactionFilter?: Filter
) => {
  return await transactionsApi.getTransactions(
    user,
    pageParam,
    transactionFilter
  );
};

export const getStatistics = async (user: string) => {
  return await transactionsApi.getStatistics(user);
};

export const addTransaction = async (transaction: Transaction) => {
  return await transactionsApi.addTransaction(transaction);
};

export const updateTransaction = async (transaction: Transaction) => {
  return await transactionsApi.updateTransaction(transaction);
};

export const deleteTransaction = async (transaction: Transaction) => {
  return await transactionsApi.deleteTransaction(transaction);
};

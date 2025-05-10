import type { Transaction } from "@/app/components/transactions/TransactionItem";
import type { GroupedTransaction } from "@/utils/groupTransactionsByMonth";
import type { Filter } from "@/utils/types";

export interface TransactionsRepository {
  getTransactions(
    user: string,
    pageParam?: number | null,
    transactionFilter?: Filter
  ): Promise<
    | {
        data: Transaction[];
        lastDoc: any;
      }
    | undefined
  >;
  getStatistics(user: string): Promise<
    | {
        credit: number;
        debit: number;
        groupedTransactions: GroupedTransaction[];
      }
    | undefined
  >;
  addTransaction(transaction: Transaction): Promise<{ success: boolean }>;
  updateTransaction(transaction: Transaction): Promise<{ success: boolean }>;
  deleteTransaction(transaction: Transaction): Promise<{ success: boolean }>;
}

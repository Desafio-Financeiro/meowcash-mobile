import { TransactionType } from "@/infrastructure/api/TransactionsApi";

export interface Filter {
  date: {
    start: Date | null;
    end: Date | null;
  };
  transactionType: TransactionType | null;
  hasAttachment: boolean | null;
  transactionText: string | null;
}

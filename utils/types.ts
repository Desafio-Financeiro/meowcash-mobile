import { TransactionType } from "@/api/transaction";

export interface Filter {
  date: {
    start: Date | null;
    end: Date | null;
  },
  transactionType: TransactionType | null,
  hasAttachment: boolean | null,
  transactionText: string | null,
}
import { Transaction } from "@/app/components/transactions/TransactionItem";
import { Filter } from "@/utils/types";
import { atom } from "recoil";

export const transactionsState = atom<Transaction[]>({
  key: "transactions",
  default: [],
});

export const transactionsFilterState = atom<Filter>({
  key: "transactionsFilter",
  default: {
    date: {
      start: null,
      end: null,
    },
    transactionType: null,
    hasAttachment: null,
    transactionText: null,
  },
});

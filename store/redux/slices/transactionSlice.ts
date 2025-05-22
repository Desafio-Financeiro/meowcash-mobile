import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "@/app/components/transactions/TransactionItem";
import { Filter } from "@/utils/types";

type TransactionState = {
  list: Transaction[];
  filter: Filter;
};

const initialState: TransactionState = {
  list: [],
  filter: {
    date: { start: null, end: null },
    transactionType: null,
    hasAttachment: null,
    transactionText: null,
  },
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions(state, action: PayloadAction<Transaction[]>) {
      state.list = action.payload;
    },
    setTransactionFilter(state, action: PayloadAction<Filter>) {
      state.filter = action.payload;
    },
    clearTransactionFilter(state) {
      state.filter = {
        date: { start: null, end: null },
        transactionType: null,
        hasAttachment: null,
        transactionText: null,
      };
    },
  },
});

export const { setTransactions, setTransactionFilter, clearTransactionFilter } =
  transactionSlice.actions;

export default transactionSlice.reducer;

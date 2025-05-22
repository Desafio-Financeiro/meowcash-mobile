import {
  clearTransactionFilter,
  setTransactionFilter,
} from "@/store/redux/slices/transactionSlice";
import { useAppDispatch, useAppSelector } from "@/store/redux/hooks";
import { Filter } from "@/utils/types";

export function useTransactionFilters() {
  const dispatch = useAppDispatch();
  const transactionFilter = useAppSelector(
    (state) => state.transactions.filter
  );

  return {
    transactionFilter,
    setTransactionFilter: (filter: Filter) =>
      dispatch(setTransactionFilter(filter)),
    handleClearFilter: () => dispatch(clearTransactionFilter()),
  };
}

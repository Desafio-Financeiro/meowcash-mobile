import { useRecoilState } from "recoil";
import { transactionsFilterState } from "../atoms/transactionAtoms";

export function useTransactionFilters() {
  const [transactionFilter, setTransactionFilter] = useRecoilState(
    transactionsFilterState
  );
  function handleClearFilter() {
    setTransactionFilter({
      date: {
        start: null,
        end: null,
      },
      transactionType: null,
      hasAttachment: null,
      transactionText: null,
    });
  }

  return {
    transactionFilter,
    handleClearFilter,
    setTransactionFilter,
  };
}

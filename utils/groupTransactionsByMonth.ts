import { Transaction } from "@/app/components/transactions/TransactionItem";

export type GroupedTransaction = {
  monthNumber: number;
  year: number;
  transactions: Transaction[];
};

export function groupTransactionsByMonth(
  transactions: Transaction[]
): GroupedTransaction[] {
  const groupedByMonth = new Map<string, GroupedTransaction>();

  transactions?.forEach((transaction) => {
    const date = new Date(transaction.date);
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthKey = `${year}-${month}`;

    if (!groupedByMonth.has(monthKey)) {
      groupedByMonth.set(monthKey, {
        monthNumber: month,
        year,
        transactions: [],
      });
    }

    groupedByMonth.get(monthKey)!.transactions.push(transaction);
  });

  return Array.from(groupedByMonth.values())?.sort(
    (a, b) => b.year - a.year || a.monthNumber - b.monthNumber
  );
}

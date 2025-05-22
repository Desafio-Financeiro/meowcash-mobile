import { firebase } from "@/infrastructure/firebase/config";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import type { Transaction } from "@/app/components/transactions/TransactionItem";
import {
  GroupedTransaction,
  groupTransactionsByMonth,
} from "@/utils/groupTransactionsByMonth";
import { Filter } from "@/utils/types";
import { uploadFile } from "@/utils/file";
import { getBalance, updateBalance } from "@/domain/usecases/BalanceUseCases";
import { TransactionsRepository } from "@/domain/repositories/TransactionsRepository";

export type TransactionType = "credit" | "debit";

const TRANSACTIONS_LIMIT = 6;

export const transactionsApi: TransactionsRepository = {
  getTransactions: async (
    user: string,
    pageParam?: number | null,
    transactionFilter?: Filter
  ): Promise<
    | {
        data: Transaction[];
        lastDoc: any;
      }
    | undefined
  > => {
    try {
      const transactionsRef = collection(firebase.db, "transaction");
      let conditions = [where("userId", "==", user)];

      if (transactionFilter?.date?.start) {
        conditions.push(where("date", ">=", transactionFilter.date.start));
      }
      if (transactionFilter?.date?.end) {
        conditions.push(where("date", "<=", transactionFilter.date.end));
      }

      if (transactionFilter?.transactionType) {
        conditions.push(where("type", "==", transactionFilter.transactionType));
      }

      let baseQuery = query(
        transactionsRef,
        ...conditions,
        orderBy("date", "desc"),
        ...(pageParam ? [startAfter(pageParam)] : []),
        limit(TRANSACTIONS_LIMIT)
      );

      if (transactionFilter?.transactionText) {
        const fromQuery = query(
          transactionsRef,
          ...conditions,
          where("from", ">=", transactionFilter.transactionText),
          where("from", "<=", transactionFilter.transactionText + "\uf8ff"),
          orderBy("from"),
          orderBy("date", "desc"),
          ...(pageParam ? [startAfter(pageParam)] : []),
          limit(TRANSACTIONS_LIMIT)
        );

        const toQuery = query(
          transactionsRef,
          ...conditions,
          where("to", ">=", transactionFilter.transactionText),
          where("to", "<=", transactionFilter.transactionText + "\uf8ff"),
          orderBy("to"),
          orderBy("date", "desc"),
          ...(pageParam ? [startAfter(pageParam)] : []),
          limit(TRANSACTIONS_LIMIT)
        );

        const [fromSnapshot, toSnapshot] = await Promise.all([
          getDocs(fromQuery),
          getDocs(toQuery),
        ]);

        const fromResults = fromSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Transaction[];
        const toResults = toSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Transaction[];

        const transactions = [
          ...new Map(
            [...fromResults, ...toResults].map((item) => [item.id, item])
          ).values(),
        ];
        const lastDoc = transactions.length
          ? transactions[transactions.length - 1]
          : null;

        return { data: transactions, lastDoc };
      }

      const querySnapshot = await getDocs(baseQuery);
      if (!querySnapshot.empty) {
        const transactions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Transaction[];

        const lastDoc =
          querySnapshot.docs[querySnapshot.docs.length - 1] || null;
        return { data: transactions, lastDoc };
      } else {
        return { data: [] as Transaction[], lastDoc: undefined };
      }
    } catch {
      throw new Error();
    }
  },

  getStatistics: async (
    user: string
  ): Promise<
    | {
        credit: number;
        debit: number;
        groupedTransactions: GroupedTransaction[];
      }
    | undefined
  > => {
    try {
      const transactionsRef = collection(firebase.db, "transaction");
      let q = query(transactionsRef, where("userId", "==", user));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const transactions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Transaction[];

        const groupedTransactions = groupTransactionsByMonth(transactions);

        return transactions.reduce(
          (acc, { type, value }) => {
            const key: TransactionType = type.toLowerCase() as TransactionType;
            acc[key] = (acc[key] || 0) + value;
            return acc;
          },
          { credit: 0, debit: 0, groupedTransactions }
        );
      } else {
        return { credit: 0, debit: 0, groupedTransactions: [] };
      }
    } catch {
      throw new Error();
    }
  },

  addTransaction: async (transaction: Transaction) => {
    try {
      let fileUrl = null;
      if (transaction.attachment) {
        fileUrl = await uploadFile(transaction.attachment);
        transaction.attachmentUrl = fileUrl;
      }
      delete transaction.attachment;

      await addDoc(collection(firebase.db, "transaction"), {
        ...transaction,
        date: Timestamp.fromDate(new Date(transaction.date.toString())),
      });

      const balance = await getBalance(transaction.userId);
      const newBalance =
        transaction.type === "Credit"
          ? balance + transaction.value
          : balance - transaction.value;

      await updateBalance(transaction.userId, {
        balance: newBalance,
      });

      return { success: true };
    } catch {
      throw new Error();
    }
  },

  updateTransaction: async (transaction: Transaction) => {
    try {
      const transactionRef = doc(firebase.db, "transaction", transaction.id!);

      let fileUrl = null;

      if (transaction.attachment) {
        fileUrl = await uploadFile(transaction.attachment);
        transaction.attachmentUrl = fileUrl;
      }
      delete transaction.attachment;

      await updateDoc(transactionRef, {
        type: transaction.type,
        value: transaction.value,
        date: Timestamp.fromDate(new Date(transaction.date.toString())),
        from: transaction.from,
        to: transaction.to,
      });

      const balance = await getBalance(transaction.userId);
      const newBalance =
        transaction.type === "Credit"
          ? balance - transaction.value
          : balance + transaction.value;

      await updateBalance(transaction.userId, {
        balance: newBalance,
      });

      return { success: true };
    } catch {
      throw new Error();
    }
  },

  deleteTransaction: async (transaction: Transaction) => {
    try {
      const transactionRef = doc(firebase.db, "transaction", transaction.id!);

      await updateDoc(transactionRef, {
        deletedAt: new Date().toISOString().split("T")[0],
      });

      const balance = await getBalance(transaction.userId);
      const newBalance =
        transaction.type === "Credit"
          ? balance - transaction.value
          : balance + transaction.value;

      await updateBalance(transaction.userId, {
        balance: newBalance,
      });

      return { success: true };
    } catch (error) {
      throw new Error();
    }
  },
};

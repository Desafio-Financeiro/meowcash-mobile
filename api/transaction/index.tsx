import Toast from "react-native-toast-message";
import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where
} from "firebase/firestore";
import type { Transaction } from "@/components/transactions/TransactionItem";
import { getBalance, updateBalance } from "../balance";
import { GroupedTransaction, groupTransactionsByMonth } from "@/utils/groupTransactionsByMonth";
import { Filter } from "@/utils/types";
import { uploadFile } from "@/utils/file";

export type TransactionType = "credit" | "debit";

const TRANSACTIONS_LIMIT = 6;

const getTransactions = async (
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
    const transactionsRef = collection(db, "transaction");
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
        getDocs(toQuery)
      ]);

      const fromResults = fromSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Transaction[];
      const toResults = toSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Transaction[];

      const transactions = [...new Map([...fromResults, ...toResults].map(item => [item.id, item])).values()];
      const lastDoc = transactions.length ? transactions[transactions.length - 1] : null;

      return { data: transactions, lastDoc };
    }

    const querySnapshot = await getDocs(baseQuery);
    if (!querySnapshot.empty) {
      const transactions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Transaction[];

      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;
      return { data: transactions, lastDoc };
    } else {
      return { data: [] as Transaction[], lastDoc: undefined };
    }
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    Toast.show({
      type: "error",
      text1: "Erro ao buscar transações",
      position: "bottom"
    });
  }
};


const getStatistics = async (
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
    const transactionsRef = collection(db, "transaction");
    let q = query(transactionsRef, where("userId", "==", user));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const transactions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
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
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    Toast.show({
      type: "error",
      text1: "Erro ao buscar transações",
      position: "bottom"
    });
  }
};

const addTransaction = async (transaction: Transaction) => {
  try {
    let fileUrl = null;
    if (transaction.attachment) {
      fileUrl = await uploadFile(transaction.attachment);
      delete transaction.attachment;
    }

    await addDoc(collection(db, "transaction"), {
      ...transaction,
      attachmentUrl: fileUrl
    });

    const balance = await getBalance(transaction.userId);
    const newBalance =
      transaction.type === "Credit"
        ? balance + transaction.value
        : balance - transaction.value;

    await updateBalance(transaction.userId, { balance: newBalance });

    Toast.show({
      type: "success",
      text1: "Transação adicionada!",
      position: "bottom"
    });
  } catch (error) {
    console.error("Erro ao adicionar transação: ", error);
    Toast.show({
      type: "error",
      text1: "Erro ao adicionar transação",
      position: "bottom"
    });
  }
};

const updateTransaction = async (transaction: Transaction) => {
  try {
    const transactionRef = doc(db, "transaction", transaction.id!);

    await updateDoc(transactionRef, {
      type: transaction.type,
      value: transaction.value,
      date: transaction.date,
      from: transaction.from,
      to: transaction.to
    });

    const balance = await getBalance(transaction.userId);
    const newBalance =
      transaction.type === "Credit"
        ? balance - transaction.value
        : balance + transaction.value;

    await updateBalance(transaction.userId, { balance: newBalance });

    Toast.show({
      type: "success",
      text1: "Transação editada com sucesso!",
      position: "bottom"
    });
  } catch (error) {
    console.error("Erro ao editar transação: ", error);
    Toast.show({
      type: "error",
      text1: "Erro ao editar transação",
      position: "bottom"
    });
  }
};

const deleteTransaction = async (transaction: Transaction) => {
  try {
    const transactionRef = doc(db, "transaction", transaction.id!);

    await updateDoc(transactionRef, {
      deletedAt: new Date().toISOString().split("T")[0]
    });

    const balance = await getBalance(transaction.userId);
    const newBalance =
      transaction.type === "Credit"
        ? balance - transaction.value
        : balance + transaction.value;

    await updateBalance(transaction.userId, { balance: newBalance });

    Toast.show({
      type: "success",
      text1: "Transação deletada com sucesso!",
      position: "bottom"
    });
  } catch (error) {
    console.error("Erro ao deletar transação: ", error);
    Toast.show({
      type: "error",
      text1: "Erro ao deletar transação",
      position: "bottom"
    });
  }
};

export {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getStatistics
};

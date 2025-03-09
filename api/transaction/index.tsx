import Toast from "react-native-toast-message";
import { db } from "../../firebase/config";
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
  where,
} from "firebase/firestore";
import type { Transaction } from "@/components/transactions/TransactionItem";
import { getBalance, updateBalance } from "../balance";

const TRANSACTIONS_LIMIT = 6;

const getTransactions = async (
  user: string,
  pageParam?: number | null
): Promise<{ data: Transaction[]; lastDoc: any } | undefined> => {
  try {
    const balanceRef = collection(db, "transaction");
    let q = query(
      balanceRef,
      where("userId", "==", user),
      // orderBy("date"), // Default "asc"
      orderBy("date", "desc"),
      limit(TRANSACTIONS_LIMIT)
    );

    if (pageParam) {
      q = query(
        balanceRef,
        where("userId", "==", user),
        // orderBy("date"), // Default "asc"
        orderBy("date", "desc"),
        startAfter(pageParam),
        limit(TRANSACTIONS_LIMIT)
      );
    }

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const transactions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

      return { data: transactions as Transaction[], lastDoc };
    } else {
      Toast.show({
        type: "error",
        text1: "Nenhuma transação encontrada",
        position: "bottom",
      });
    }
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    Toast.show({
      type: "error",
      text1: "Erro ao buscar transações",
      position: "bottom",
    });
  }
};

const addTransaction = async (transaction: Transaction) => {
  try {
    await addDoc(collection(db, "transaction"), transaction);

    const balance = await getBalance(transaction.userId);
    const newBalance =
      transaction.type === "Credit"
        ? balance + transaction.value
        : balance - transaction.value;

    await updateBalance(transaction.userId, { balance: newBalance });

    Toast.show({
      type: "success",
      text1: "Transação adicionada!",
      position: "bottom",
    });
  } catch (error) {
    console.error("Erro ao adicionar transação: ", error);
    Toast.show({
      type: "error",
      text1: "Erro ao adicionar transação",
      position: "bottom",
    });
  }
};

const deleteTransaction = async (transaction: Transaction) => {
  try {
    const transactionRef = doc(db, "transaction", transaction.id!);

    await updateDoc(transactionRef, {
      deletedAt: new Date().toISOString().split("T")[0],
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
      position: "bottom",
    });
  } catch (error) {
    console.error("Erro ao deletar transação: ", error);
    Toast.show({
      type: "error",
      text1: "Erro ao deletar transação",
      position: "bottom",
    });
  }
};

export { getTransactions, addTransaction, deleteTransaction };

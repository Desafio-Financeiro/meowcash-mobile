import Toast from "react-native-toast-message";
import { db } from "../../firebase/config";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { Transaction } from "@/components/Transactions/TransactionItem";

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

export { getTransactions };

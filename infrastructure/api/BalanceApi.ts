import { BalanceRepository } from "@/domain/repositories/BalanceRepository";
import { db } from "@/infrastructure/firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import Toast from "react-native-toast-message";

export const balanceApi: BalanceRepository = {
  addBalance: async (user: string, balance: number) => {
    try {
      await addDoc(collection(db, "balance"), { user, balance });

      Toast.show({
        type: "success",
        text1: "Saldo adicionado!",
        position: "bottom",
      });

      return { success: true };
    } catch (error) {
      console.error("Erro ao adicionar saldo: ", error);

      Toast.show({
        type: "error",
        text1: "Erro ao adicionar saldo",
        position: "bottom",
      });

      return { success: false };
    }
  },

  getBalance: async (user: string) => {
    try {
      const balanceRef = collection(db, "balance");
      const q = query(balanceRef, where("user", "==", user));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return doc.data().balance;
      } else {
        return 0;
      }
    } catch (error) {
      console.error("Erro ao buscar saldo:", error);

      Toast.show({
        type: "error",
        text1: "Erro ao buscar saldo",
        position: "bottom",
      });
    }
  },

  updateBalance: async (user: string, newData: { balance: number }) => {
    try {
      const balanceRef = collection(db, "balance");
      const q = query(balanceRef, where("user", "==", user));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (document) => {
          const userRef = doc(db, "balance", document.id);
          await updateDoc(userRef, newData);
        });

        return { success: true };
      } else {
        Toast.show({
          type: "error",
          text1: "Erro ao atualizar saldo",
          position: "bottom",
        });

        return { success: false };
      }
    } catch (error) {
      console.error("Erro ao atualizar saldo:", error);

      Toast.show({
        type: "error",
        text1: "Erro ao atualizar saldo",
        position: "bottom",
      });

      return { success: false };
    }
  },
};

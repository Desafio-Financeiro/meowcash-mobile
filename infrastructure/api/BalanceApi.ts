import { BalanceRepository } from "@/domain/repositories/BalanceRepository";
import { firebase } from "@/infrastructure/firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";

export const balanceApi: BalanceRepository = {
  addBalance: async (user: string, balance: number) => {
    try {
      await addDoc(collection(firebase.db, "balance"), { user, balance });
      return { success: true };
    } catch {
      throw new Error();
    }
  },

  getBalance: async (user: string) => {
    try {
      const balanceRef = collection(firebase.db, "balance");
      const q = query(balanceRef, where("user", "==", user));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return doc.data().balance;
      } else {
        return 0;
      }
    } catch {
      throw new Error();
    }
  },

  updateBalance: async (user: string, newData: { balance: number }) => {
    try {
      const balanceRef = collection(firebase.db, "balance");
      const q = query(balanceRef, where("user", "==", user));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (document) => {
          const userRef = doc(firebase.db, "balance", document.id);
          await updateDoc(userRef, newData);
        });

        return { success: true };
      } else {
        throw new Error();
      }
    } catch {
      throw new Error();
    }
  },
};

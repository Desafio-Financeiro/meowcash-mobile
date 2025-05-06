import Toast from "react-native-toast-message";
import { db } from "@/firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";

const addBalance = async (user: string, balance: number) => {
  try {
    await addDoc(collection(db, "balance"), {
      user,
      balance,
    });
    Toast.show({
      type: "success",
      text1: "Saldo adicionado!",
      position: "bottom",
    });
  } catch (error) {
    console.error("Erro ao adicionar saldo: ", error);
    Toast.show({
      type: "error",
      text1: "Erro ao adicionar saldo",
      position: "bottom",
    });
  }
};

const getBalance = async (user: string) => {
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
};

const updateBalance = async (user: string, newData: { balance: number }) => {
  try {
    const balanceRef = collection(db, "balance");
    const q = query(balanceRef, where("user", "==", user));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (document) => {
        const userRef = doc(db, "balance", document.id);
        await updateDoc(userRef, newData);
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Erro ao atualizar saldo",
        position: "bottom",
      });
    }
  } catch (error) {
    console.error("Erro ao atualizar saldo:", error);
    Toast.show({
      type: "error",
      text1: "Erro ao atualizar saldo",
      position: "bottom",
    });
  }
};

export { addBalance, getBalance, updateBalance };

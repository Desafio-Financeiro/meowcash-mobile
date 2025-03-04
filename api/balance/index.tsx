import { db } from "../../firebase/config";
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
    console.log("Saldo adicionado!");
  } catch (error) {
    console.error("Erro ao adicionar saldo: ", error);
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
      console.log("Nenhum usuário encontrado.");
    }
  } catch (error) {
    console.error("Erro ao buscar saldo:", error);
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

        console.log("Saldo atualizado com sucesso!");
      });
    } else {
      console.log("Nenhum usuário encontrado.");
    }
  } catch (error) {
    console.error("Erro ao atualizar saldo:", error);
  }
};

export { addBalance, getBalance, updateBalance };

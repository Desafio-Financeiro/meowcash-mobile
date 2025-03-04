import { Balance } from "@/components/balance";
import { SummaryCard } from "@/components/summary-card";
import { Text, View } from "react-native";
import { styles } from "./style";
import { getAuth } from "firebase/auth";
import { getCurrentDate } from "@/utils/getCurrentData";
import TransactionsList from "@/components/transactions/list";
import { useEffect, useState } from "react";
import { getBalance } from "@/api/balance";

export default function Home() {
  const auth = getAuth();
  const [balance, setBalance] = useState<number>(0);

  const getUserBalance = async () => {
    const balance = await getBalance(auth.currentUser?.uid || "");

    setBalance(balance);
  };

  useEffect(() => {
    if (auth.currentUser) {
      getUserBalance();
    }
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.hello}>Olá, {auth.currentUser?.displayName}</Text>
        <Text style={styles.date}>{getCurrentDate()}</Text>
      </View>

      <View style={styles.summaryContainer}>
        <Balance balance={balance} />
        <SummaryCard value={5000} type="income" />
        <SummaryCard value={2000} type="outcome" />
      </View>
      <View style={styles.transactions}>
        <TransactionsList />
      </View>
    </View>
  );
}

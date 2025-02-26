import { Balance } from "@/components/balance";
import { SummaryCard } from "@/components/summary-card";
import { Text, View } from "react-native";
import { styles } from "./style";
import { getAuth } from "firebase/auth";

export default function Home() {
  const auth = getAuth();
  function getCurrentDate() {
    const locale = "pt-br";
    return new Date().toLocaleDateString(locale, {
      year: "numeric",
      month: "2-digit",
      weekday: "long",
      day: "2-digit",
    });
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.hello}>Olá, {auth.currentUser?.displayName}</Text>
        <Text style={styles.date}>{getCurrentDate()}</Text>
      </View>

      <View style={styles.summaryContainer}>
        <Balance balance={1000} />
        <SummaryCard value={5000} type="income" />
        <SummaryCard value={2000} type="outcome" />
      </View>
    </View>
  );
}

import { Balance } from "@/components/balance";
import { SummaryCard } from "@/components/summary-card";
import { Text, View } from "react-native";
import { styles } from "./style";
import { getAuth } from "firebase/auth";
import { getCurrentDate } from "@/utils/getCurrentData";
import TransactionsList from "@/components/transactions/list";
import { DatePicker } from "../../../components/datePicker";
import { useState } from "react";

export default function Home() {
  const auth = getAuth();
  const [date, setDate] = useState(new Date());

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
      <DatePicker value={date} onChange={(data) => {
        setDate(data);
      }}
                  label="Data">
      </DatePicker>
      <View style={styles.transactions}>
        <TransactionsList />
      </View>
    </View>
  );
}

import { Balance } from "@/components/balance";
import { SummaryCard } from "@/components/summary-card";
import { Text, View, ScrollView } from "react-native";
import { styles } from "./style";
import { getAuth } from "firebase/auth";
import { getCurrentDate } from "@/utils/getCurrentData";
import { getBalance } from "@/api/balance";
import { useQuery } from "@tanstack/react-query";
import StaticTransactionsList from "@/components/Transactions/StaticTransactionsList";
import { transactionsMOCK } from "@/components/Transactions/mock";
import { DatePicker } from "../../../components/datePicker";
import { useState } from "react";

export default function Home() {
  const auth = getAuth();
  const [date, setDate] = useState(new Date());

  const { isLoading, data } = useQuery({
    queryKey: ["balanceInfo"],
    queryFn: () => getBalance(auth.currentUser?.uid || ""),
    enabled: !!auth.currentUser?.uid,
  });

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.hello}>Olá, {auth.currentUser?.displayName}</Text>
        <Text style={styles.date}>{getCurrentDate()}</Text>
      </View>

      <ScrollView>
        <View style={styles.summaryContainer}>
          <Balance balance={data} isLoading={isLoading} />
          <SummaryCard value={5000} type="income" />
          <SummaryCard value={2000} type="outcome" />
        </View>
        <DatePicker value={date} onChange={(data) => {
        setDate(data);
      }}
                  label="Data">
      </DatePicker>
      <View style={styles.transactions}>
          <StaticTransactionsList data={transactionsMOCK} />
        </View>
      </ScrollView>
    </View>
  );
}

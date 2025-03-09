import { Balance } from "@/components/balance";
import { SummaryCard } from "@/components/summary-card";
import { Text, View, ScrollView } from "react-native";
import { styles } from "./style";
import { getCurrentDate } from "@/utils/getCurrentData";
import { getBalance } from "@/api/balance";
import { useQuery } from "@tanstack/react-query";
import StaticTransactionsList from "@/components/Transactions/StaticTransactionsList";
import { DatePicker } from "../../../components/datePicker";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTransactions } from "@/context/TransactionsContext";

export default function Home() {
  const { user } = useAuth();
  const { transactions, hasNextPage } = useTransactions();
  const [date, setDate] = useState(new Date());

  const { isLoading, data } = useQuery({
    queryKey: ["balanceInfo"],
    queryFn: () => getBalance(user?.uid || ""),
    enabled: !!user?.uid,
  });

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.hello}>Olá, {user?.displayName}</Text>
        <Text style={styles.date}>{getCurrentDate()}</Text>
      </View>

      <ScrollView>
        <View style={styles.summaryContainer}>
          <Balance balance={data} isLoading={isLoading} />
          <SummaryCard value={5000} type="income" />
          <SummaryCard value={2000} type="outcome" />
        </View>
        <DatePicker
          value={date}
          onChange={(data) => {
            setDate(data);
          }}
          label="Data"
        ></DatePicker>
        <View style={styles.transactions}>
          <StaticTransactionsList data={transactions} hasNextPage={hasNextPage} />
        </View>
      </ScrollView>
    </View>
  );
}

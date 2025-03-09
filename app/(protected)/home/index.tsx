import { Balance } from "@/components/balance";
import { SummaryCard } from "@/components/summary-card";
import { Text, View, ScrollView } from "react-native";
import { styles } from "./style";
import { getAuth } from "firebase/auth";
import { getBalance } from "@/api/balance";
import { useQuery } from "@tanstack/react-query";
import StaticTransactionsList from "@/components/transactions/StaticTransactionsList";
import { transactionsMOCK } from "@/components/transactions/mock";
import { useState } from "react";
import { getFullCurrentDate } from "@/utils/getCurrentDate";
import { TransactionFilters } from "@/components/transactions/filters";

export default function Home() {
  const auth = getAuth();
  const [transactionDate, setTransactionDate] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: new Date(),
    end: new Date(),
  });
  const [transactionFilter, setTransactionFilter] = useState("");

  const { isLoading, data } = useQuery({
    queryKey: ["balanceInfo"],
    queryFn: () => getBalance(auth.currentUser?.uid || ""),
    enabled: !!auth.currentUser?.uid,
  });

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.hello}>Olá, {auth.currentUser?.displayName}</Text>
        <Text style={styles.date}>{getFullCurrentDate()}</Text>
      </View>

      <Balance balance={data} isLoading={isLoading} />

      <ScrollView>
        <View style={styles.summaryContainer}>
          <SummaryCard value={5000} type="income" />
          <SummaryCard value={2000} type="outcome" />
        </View>

        <TransactionFilters
          handleTransactionDate={(date) => setTransactionDate(date)}
          handleTransactionFilter={(filter) => setTransactionFilter(filter)}
        />

        <StaticTransactionsList data={transactionsMOCK} />
      </ScrollView>
    </View>
  );
}

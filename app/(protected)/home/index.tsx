import { Balance } from "@/components/balance";
import { SummaryCard } from "@/components/summary-card";
import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import { styles } from "./style";
import { getCurrentDate } from "@/utils/getCurrentData";
import { getBalance } from "@/api/balance";
import { useQuery } from "@tanstack/react-query";
import StaticTransactionsList from "@/components/Transactions/StaticTransactionsList";
import { DatePicker } from "../../../components/datePicker";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTransactions } from "@/context/TransactionsContext";
import { Button } from "@/components/button";
import { addTransaction } from "@/api/transaction";
import { theme } from "@/theme";

export default function Home() {
  const { user } = useAuth();
  const {
    transactions,
    refetchTransactions,
    isLoading: transactionsIsLoading,
  } = useTransactions();
  const [date, setDate] = useState(new Date());

  const {
    isLoading,
    data,
    refetch: refetchBalance,
  } = useQuery({
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
        />
        <Button
          title="Criar transação de débito"
          variant="link"
          onPress={() =>
            addTransaction({
              type: "Debit",
              value: 100,
              date: "2025-03-09",
              to: "John Doe",
              userId: user!.uid,
            }).then(() => {
              refetchTransactions();
              refetchBalance();
            })
          }
        />
        <Button
          title="Criar transação de crédito"
          variant="link"
          onPress={() =>
            addTransaction({
              type: "Credit",
              value: 300,
              date: "2025-03-09",
              from: "John Doe",
              userId: user!.uid,
            }).then(() => {
              refetchTransactions();
              refetchBalance();
            })
          }
        />
        <View style={styles.transactions}>
          {transactionsIsLoading ? (
            <ActivityIndicator
              size="large"
              color={theme.colors.primary60}
              style={{ marginVertical: 24 }}
            />
          ) : (
            <StaticTransactionsList data={transactions} />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

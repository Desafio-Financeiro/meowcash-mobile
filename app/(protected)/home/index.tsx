import { Balance } from "@/components/balance";
import { SummaryCard } from "@/components/summary-card";
import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import { styles } from "./style";
import { getFullCurrentDate } from "@/utils/getCurrentDate";
import StaticTransactionsList from "@/components/transactions/StaticTransactionsList";
import { useAuth } from "@/context/AuthContext";
import { useTransactions } from "@/context/TransactionsContext";
import { Button } from "@/components/button";
import { addTransaction } from "@/api/transaction";
import { theme } from "@/theme";
import { TransactionFilters } from "@/components/transactions/filters";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const {
    transactions,
    refetchTransactions,
    isLoading: transactionsIsLoading,
    balanceIsLoading,
    balance,
    refetchBalance,
    statistics,
    statisticsIsLoading,
    refetchStatistics,
    transactionFilter,
    setTransactionFilter
  } = useTransactions();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.hello}>Olá, {user?.displayName}</Text>
        <Text style={styles.date}>{getFullCurrentDate()}</Text>
      </View>

      <Balance balance={balance} isLoading={balanceIsLoading} />

      <ScrollView>
        <View style={styles.summaryContainer}>
          <SummaryCard
            value={statistics?.credit || 0}
            type="income"
            isLoading={statisticsIsLoading}
          />
          <SummaryCard
            value={statistics?.debit || 0}
            type="outcome"
            isLoading={statisticsIsLoading}
          />
          <View
            style={{
              width: 200,
              marginHorizontal: "auto",
              marginBottom: 24,
              marginTop: 10
            }}
          >
            <Button
              title="Ver relatório completo"
              variant="primary"
              onPress={() => navigation.navigate("Reports" as never)}
            />
          </View>
        </View>

        <Text style={styles.hello}>Transações recentes</Text>

        <Button
          title="Criar transação de débito"
          variant="link"
          onPress={() =>
            addTransaction({
              type: "Debit",
              value: 454444,
              date: "2021-03-09",
              to: "Paulo",
              userId: user!.uid
            }).then(() => {
              refetchTransactions();
              refetchBalance();
              refetchStatistics();
            })
          }
        />
        <Button
          title="Criar transação de crédito"
          variant="link"
          onPress={() =>
            addTransaction({
              type: "Credit",
              value: 5300,
              date: "2021-03-09",
              from: "Rapaz",
              userId: user!.uid
            }).then(() => {
              refetchTransactions();
              refetchBalance();
              refetchStatistics();
            })
          }
        />

        <TransactionFilters
          handleTransactionDate={(date) => setTransactionFilter({ ...transactionFilter, date: date })}
          handleTransactionType={(filter) => setTransactionFilter({
            ...transactionFilter,
            transactionType: filter
          })}
          handleTransactionText={(filter) => setTransactionFilter({
            ...transactionFilter,
            transactionText: filter
          })}
        />
        {transactionsIsLoading ? (
          <ActivityIndicator
            size="large"
            color={theme.colors.primary60}
            style={{ marginVertical: 24 }}
          />
        ) : transactions.length > 0 ? (
          <>
            <StaticTransactionsList data={transactions} />
          </>
        ) : (
          <Text style={styles.emptyHistory}>
            Não existe histórico de transações
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

import { Balance } from "@/components/balance";
import { SummaryCard } from "@/components/summary-card";
import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import { styles } from "./style";
import { getFullCurrentDate } from "@/utils/getCurrentDate";
import StaticTransactionsList from "@/components/transactions/StaticTransactionsList";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTransactions } from "@/context/TransactionsContext";
import { Button } from "@/components/button";
import { addTransaction } from "@/api/transaction";
import { theme } from "@/theme";
import { TransactionFilters } from "@/components/transactions/filters";
import FileUploader from "@/components/fileUploader/FileUploader";
import * as DocumentPicker from "expo-document-picker";
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
    refetchStatistics
  } = useTransactions();

  const [transactionDate, setTransactionDate] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: new Date(),
    end: new Date()
  });
  const [transactionFilter, setTransactionFilter] = useState("");
  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);


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
              marginTop: 10,
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

        <FileUploader file={file} setFile={setFile}></FileUploader>

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
              attachment: file
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
              value: 300,
              date: "2025-03-09",
              from: "John Doe",
              userId: user!.uid
            }).then(() => {
              refetchTransactions();
              refetchBalance();
              refetchStatistics();
            })
          }
        />

        {transactionsIsLoading ? (
          <ActivityIndicator
            size="large"
            color={theme.colors.primary60}
            style={{ marginVertical: 24 }}
          />
        ) : transactions.length > 0 ? (
          <>
            <TransactionFilters
              handleTransactionDate={(date) => setTransactionDate(date)}
              handleTransactionFilter={(filter) => setTransactionFilter(filter)}
            />
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

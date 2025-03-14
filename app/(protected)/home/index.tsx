import AntDesign from "@expo/vector-icons/AntDesign";
import { Balance } from "@/components/balance";
import { SummaryCard } from "@/components/summary-card";
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { styles } from "./style";
import { getFullCurrentDate } from "@/utils/getCurrentDate";
import StaticTransactionsList from "@/components/transactions/StaticTransactionsList";
import { useAuth } from "@/context/AuthContext";
import { useTransactions } from "@/context/TransactionsContext";
import { Button } from "@/components/button";
import { theme } from "@/theme";
import { TransactionFilters } from "@/components/transactions/filters";
import FileUploader from "@/components/fileUploader/FileUploader";
import * as DocumentPicker from "expo-document-picker";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { CreateTransaction } from "@/components/transactions/CreateTransaction";

export default function Home() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const {
    transactions,
    isLoading: transactionsIsLoading,
    balanceIsLoading,
    balance,
    statistics,
    statisticsIsLoading,
    refetchStatistics,
    transactionFilter,
    setTransactionFilter
  } = useTransactions();

  const [showAddTransactionDialog, setShowAddTransactionDialog] =
    useState(false);

  return (
    <>
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
          <View style={styles.transactionsContainer}>
            <Text style={styles.hello}>Transações recentes
            </Text>
            <TouchableOpacity
              onPress={() => setShowAddTransactionDialog(true)}
              style={styles.fab}
            >
              <AntDesign name="pluscircle" size={50} color={theme.colors.primary70} />
            </TouchableOpacity>
          </View>
          <CreateTransaction
            onClose={() => setShowAddTransactionDialog(false)}
            open={showAddTransactionDialog}
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
    </>
  );
}

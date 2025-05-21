import AntDesign from "@expo/vector-icons/AntDesign";
import { Balance } from "@/app/components/Balance";
import { SummaryCard } from "@/app/components/SummaryCard";
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { styles } from "./style";
import { getFullCurrentDate } from "@/utils/getCurrentDate";
import StaticTransactionsList from "@/app/components/transactions/StaticTransactionsList";
import { Button } from "@/app/components/Button";
import { theme } from "@/theme";
import { TransactionFilters } from "@/app/components/transactions/Filters";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { TransactionForm } from "@/app/components/transactions/TransactionForm";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAuthState } from "@/store/atoms/authAtoms";
import { useTransactionList } from "@/store/hooks/useTransactionList";
import { useBalance } from "@/store/hooks/useBalance";
import { useStatistics } from "@/store/hooks/useStatistics";
import { transactionsFilterState } from "@/store/atoms/transactionAtoms";
import { useTransactionFilters } from "@/store/hooks/useTransactionFilters";

export default function Home() {
  const navigation = useNavigation();
  const user = useRecoilValue(userAuthState);
  const { setTransactionFilter, transactionFilter } = useTransactionFilters();

  const { transactions, isLoading: transactionsIsLoading } =
    useTransactionList();
  const { balance, isLoading: balanceIsLoading } = useBalance();
  const { statistics, isLoading: statisticsIsLoading } = useStatistics();

  const [showAddTransactionDialog, setShowAddTransactionDialog] =
    useState(false);

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
        <View style={styles.transactionsContainer}>
          <Text style={styles.hello}>Transações recentes</Text>
          <TouchableOpacity
            onPress={() => setShowAddTransactionDialog(true)}
            style={styles.fab}
          >
            <AntDesign
              name="pluscircle"
              size={50}
              color={theme.colors.primary70}
            />
          </TouchableOpacity>
        </View>
        <TransactionForm
          onClose={() => {
            setShowAddTransactionDialog(false);
          }}
          open={showAddTransactionDialog}
        />
        <TransactionFilters
          handleTransactionDate={(date) =>
            setTransactionFilter({ ...transactionFilter, date: date })
          }
          handleTransactionType={(filter) =>
            setTransactionFilter({
              ...transactionFilter,
              transactionType: filter,
            })
          }
          handleTransactionText={(filter) =>
            setTransactionFilter({
              ...transactionFilter,
              transactionText: filter,
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
          <StaticTransactionsList data={transactions} />
        ) : (
          <Text style={styles.emptyHistory}>
            Não existe histórico de transações
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

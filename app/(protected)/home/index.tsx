import { Balance } from "@/components/balance";
import { SummaryCard } from "@/components/summary-card";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { styles } from "./style";
import { getAuth } from "firebase/auth";
import { getBalance } from "@/api/balance";
import { useQuery } from "@tanstack/react-query";
import StaticTransactionsList from "@/components/transactions/StaticTransactionsList";
import { transactionsMOCK } from "@/components/transactions/mock";
import { DatePicker } from "../../../components/datePicker";
import { useState } from "react";
import { getFullCurrentDate } from "@/utils/getCurrentDate";
import { DateRangeSelector } from "@/components/data-range-selector";
import { OptionsSelector } from "@/components/options-selector";

export default function Home() {
  const auth = getAuth();
  const [transactionDate, setTransactionDate] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [transactionFilter, setTransactionFilter] = useState("");
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showTransactionFilter, setShowTransactionFilter] = useState(false);

  console.log({ date: transactionDate, transactionFilter });

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

      <ScrollView>
        <View style={styles.summaryContainer}>
          <Balance balance={data} isLoading={isLoading} />
          <SummaryCard value={5000} type="income" />
          <SummaryCard value={2000} type="outcome" />
        </View>
        <DateRangeSelector
          onDateChange={(start, end) => setTransactionDate({ start, end })}
          open={showDateFilter}
          onClose={() => setShowDateFilter(false)}
        />
        <OptionsSelector
          open={showTransactionFilter}
          onClose={() => setShowTransactionFilter(false)}
          handleOptionSelection={(option) => setTransactionFilter(option)}
        />

        <View style={styles.filtersContainer}>
          <TouchableOpacity
            onPress={() => setShowDateFilter(true)}
            style={styles.filterButton}
          >
            <Text style={styles.filterButtonText}>Período</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowTransactionFilter(true)}
            style={styles.filterButton}
          >
            <Text style={styles.filterButtonText}>Movimentações</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.transactions}>
          <StaticTransactionsList data={transactionsMOCK} />
        </View>
      </ScrollView>
    </View>
  );
}

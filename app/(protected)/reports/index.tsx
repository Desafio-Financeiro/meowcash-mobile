import { Text, ScrollView } from "react-native";
import { styles } from "./style";
import { useTransactions } from "@/context/TransactionsContext";
import PieChart from "@/components/PieChart";
import BarChart from "@/components/BarChart";

export default function Reports() {
  const { statistics } = useTransactions();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Relatórios</Text>

      <PieChart credit={statistics?.credit} debit={statistics?.debit} />
      <BarChart data={statistics?.groupedTransactions} />
    </ScrollView>
  );
}

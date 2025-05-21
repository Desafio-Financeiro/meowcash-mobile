import { Text, ScrollView } from "react-native";
import { styles } from "./style";
import PieChart from "@/app/components/PieChart";
import BarChart from "@/app/components/BarChart";
import { useStatistics } from "@/store/hooks/useStatistics";

export default function Reports() {
  const { statistics } = useStatistics();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Relatórios</Text>

      <PieChart credit={statistics?.credit} debit={statistics?.debit} />
      <BarChart data={statistics?.groupedTransactions} />
    </ScrollView>
  );
}

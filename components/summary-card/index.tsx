import { formatCurrency } from "@/utils/formatCurrency";
import { Text, View } from "react-native";
import { styles } from "./style";
import Arrow from "../Icons/Arrow";
import { theme } from "@/theme";

interface SummaryCardProps {
  value: number;
  type: "income" | "outcome";
}

export function SummaryCard({ value, type }: SummaryCardProps) {
  const iconBackgroundColor =
    type === "income" ? theme.colors.success : theme.colors.danger;

  return (
    <View style={styles.container}>
      <View style={[styles.icon, { backgroundColor: iconBackgroundColor }]}>
        {type === "income" ? <Arrow /> : <Arrow rotation={180} scaleX={-1} />}
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>
          {type === "income" ? "Entradas" : "Saídas"}
        </Text>
        <Text style={styles.value}>R$ {formatCurrency(value)}</Text>
        <Text style={styles.period}>Relação dos últimos 30 dias</Text>
      </View>
    </View>
  );
}

import Feather from "@expo/vector-icons/Feather";

import { formatCurrency } from "@/utils/formatCurrency";
import { Text, View } from "react-native";
import { styles } from "./style";
import { theme } from "@/theme";
import SkeletonLoading from "expo-skeleton-loading";

interface SummaryCardProps {
  value: number;
  type: "income" | "outcome";
  isLoading?: boolean;
}

export function SummaryCard({
  value,
  type,
  isLoading,
}: Readonly<SummaryCardProps>) {
  const iconBackgroundColor =
    type === "income" ? theme.colors.success : theme.colors.danger;

  return (
    <View style={styles.container}>
      <View style={[styles.icon, { backgroundColor: iconBackgroundColor }]}>
        <Feather
          name={type === "income" ? "trending-up" : "trending-down"}
          size={20}
          color={theme.colors.black}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>
          {type === "income" ? "Entradas" : "Saídas"}
        </Text>
        {isLoading ? (
          <SkeletonLoading
            background={theme.colors.gray10}
            highlight={theme.colors.white}
          >
            <Text style={styles.value}>R$ ****</Text>
          </SkeletonLoading>
        ) : (
          <Text style={styles.value}>R$ {formatCurrency(value)}</Text>
        )}

        <Text style={styles.period}>Relação dos últimos 30 dias</Text>
      </View>
    </View>
  );
}

import { Text, View, ScrollView } from "react-native";
import { styles } from "./style";
import { useTransactions } from "@/context/TransactionsContext";
import { theme } from "@/theme";
import { PieChart } from "react-native-gifted-charts";
import { formatCurrency } from "@/utils/formatCurrency";
import { Feather } from "@expo/vector-icons";

export default function Reports() {
  const { statistics } = useTransactions();
  const total = (statistics?.credit || 0) + (statistics?.debit || 0);
  const positiveBalance = statistics!.credit > statistics!.debit;
  const centerIcon = positiveBalance ? "trending-up" : "trending-down";
  const centerColor = positiveBalance
    ? theme.colors.success
    : theme.colors.danger;
  const iconColor = positiveBalance
    ? theme.colors.successDark
    : theme.colors.dangerDark;

  const renderLegend = (text: string, color: string, value: number) => {
    return (
      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        <View
          style={{
            ...styles.legend,
            backgroundColor: color || "white",
          }}
        />
        <View>
          <Text style={styles.text}>{text || ""}</Text>
          <Text style={styles.text}>R$ {formatCurrency(value)}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Relatórios</Text>

      <View style={styles.chart}>
        <Text style={styles.chartTitle}>Transações</Text>

        <PieChart
          strokeColor="white"
          strokeWidth={4}
          donut
          data={[
            {
              value: statistics?.credit || 0,
              color: theme.colors.success,
              text: `${((statistics?.credit || 0) / total) * 100}%`,
              textColor: theme.colors.successDark,
              textSize: 20,
              fontWeight: "bold",
            },
            {
              value: statistics?.debit || 0,
              color: theme.colors.danger,
              text: `${((statistics?.debit || 0) / total) * 100}%`,
              textColor: theme.colors.dangerDark,
              textSize: 20,
              fontWeight: "bold",
            },
          ]}
          innerCircleColor={centerColor}
          innerCircleBorderWidth={6}
          innerCircleBorderColor={"white"}
          showValuesAsLabels={true}
          showText
          textSize={18}
          centerLabelComponent={() => {
            return (
              <View>
                <Feather name={centerIcon} size={48} color={iconColor} />
              </View>
            );
          }}
        />

        <View style={styles.legendContainer}>
          {renderLegend(
            "Entradas",
            theme.colors.success,
            statistics?.credit || 0
          )}
          {renderLegend("Saídas", theme.colors.danger, statistics?.debit || 0)}
        </View>
      </View>
    </ScrollView>
  );
}

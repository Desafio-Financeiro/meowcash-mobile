import { Text, View } from "react-native";
import { styles } from "./style";
import { theme } from "@/theme";
import { PieChart as PieChartLib } from "react-native-gifted-charts";
import { formatCurrency } from "@/utils/formatCurrency";
import { Feather } from "@expo/vector-icons";
import { formatPercentage } from "@/utils/formatPercentage";

export default function PieChart({
  credit = 0,
  debit = 0,
}: {
  credit?: number;
  debit?: number;
}) {
  const total = credit + debit;
  const positiveBalance = credit > debit;
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
    <View style={styles.chart}>
      <Text style={styles.chartTitle}>Transações</Text>

      <PieChartLib
        strokeColor="white"
        strokeWidth={4}
        donut
        data={[
          {
            value: credit,
            color: theme.colors.success,
            text: formatPercentage(credit, total),
            textColor: theme.colors.successDark,
            textSize: 20,
            fontWeight: "bold",
            labelPosition: "mid",
            shiftTextY: -70,
            shiftTextX: -30,
          },
          {
            value: debit,
            color: theme.colors.danger,
            text: formatPercentage(debit, total),
            textColor: theme.colors.dangerDark,
            textSize: 20,
            fontWeight: "bold",
            labelPosition: "mid",
            shiftTextY: 70,
            shiftTextX: -30,
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
        {renderLegend("Entradas", theme.colors.success, credit)}
        {renderLegend("Saídas", theme.colors.danger, debit)}
      </View>
    </View>
  );
}

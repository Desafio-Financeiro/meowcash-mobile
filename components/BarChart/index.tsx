import { View, Text, Dimensions } from "react-native";
import { BarChart as BarChartLib } from "react-native-gifted-charts";
import { styles } from "./style";
import { theme } from "@/theme";
import { GroupedTransaction } from "@/utils/groupTransactionsByMonth";

const monthMapper = {
  0: "Jan",
  1: "Fev",
  2: "Mar",
  3: "Abr",
  4: "Mai",
  5: "Jun",
  6: "Jul",
  7: "Ago",
  8: "Set",
  9: "Out",
  10: "Nov",
  11: "Dez",
};

export default function BarChart({
  data = [],
}: {
  data?: GroupedTransaction[];
}) {
  const barData = data.map((item) => {
    const object = [
      {
        value: 0,
        label: monthMapper[item.monthNumber],
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: theme.colors.text },
        frontColor: theme.colors.success,
      },
      { value: 0, frontColor: theme.colors.danger },
    ];

    item.transactions.map((transaction) => {
      if (transaction.type === "Credit") {
        object[0].value += transaction.value;
      } else {
        object[1].value += transaction.value;
      }
    });

    return object;
  });

  const renderTitle = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginVertical: 24,
          gap: 24,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flexDirection: "row", marginBottom: 12 }}>
            <View
              style={{
                ...styles.legend,
                backgroundColor: theme.colors.success,
              }}
            />
            <View>
              <Text style={styles.text}>Entradas</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flexDirection: "row", marginBottom: 12 }}>
            <View
              style={{
                ...styles.legend,
                backgroundColor: theme.colors.danger,
              }}
            />
            <View>
              <Text style={styles.text}>Saídas</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.chart}>
      <Text style={styles.chartTitle}>Transações por mês</Text>
      {renderTitle()}
      <View style={{ marginRight: 40 }}>
        <BarChartLib
          data={barData.flat()}
          barWidth={8}
          spacing={24}
          roundedTop
          roundedBottom
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{ color: theme.colors.text }}
          noOfSections={5}
          maxValue={1000}
          width={Dimensions.get("window").width - 150}
        />
      </View>
    </View>
  );
}

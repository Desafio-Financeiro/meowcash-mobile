import { theme } from "@/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./style";
import { formatCurrency } from "@/utils/formatCurrency";

interface BalanceProps {
  balance: number;
}

export function Balance({ balance }: BalanceProps) {
  const [showBalance, setShowBalance] = useState(true);
  const icon = showBalance ? "eye" : "eye-off";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Seu saldo atual</Text>
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={theme.colors.primary60}
          onPress={() => setShowBalance((oldState) => !oldState)}
        />
      </View>

      <Text style={styles.balance}>
        R$ {showBalance ? formatCurrency(balance) : "****"}
      </Text>
    </View>
  );
}

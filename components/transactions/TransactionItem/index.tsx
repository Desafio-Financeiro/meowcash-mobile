import { View, Text } from "react-native";
import { format } from "date-fns";
import { Button } from "@/components/button";
import { styles } from "./style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "@/theme";
import { formatCurrency } from "@/utils/formatCurrency";

export interface TransactionModal extends Omit<Props, "transactionsList"> {
  transaction: Transaction;
}

export interface Props {
  transactionsList: Transaction[];
  edit: (id: Transaction["id"]) => void;
  exclude: (id: Transaction["id"]) => void;
}

export interface Transaction {
  id: string;
  type: "Credit" | "Debit";
  value: number;
  date: string;
  from?: string;
  to?: string;
  userId: string;
}

const TransactionItem = (transactionModal: TransactionModal) => {
  const { edit, transaction, exclude } = transactionModal;
  const { id, date, to, from, value, type } = transaction;

  const styleValue = type === "Credit" ? styles.credit : styles.debit;
  const styleIcon = type === "Credit" ? styles.iconCredit : styles.iconDebit;

  return (
    <View style={styles.transaction}>
      <View style={styles.title}>
        <View style={{ ...styles.icon, ...styleIcon }}>
          <MaterialCommunityIcons
            name={type === "Credit" ? "trending-up" : "trending-down"}
            size={26}
            color={theme.colors.black}
          />
        </View>
        <View style={styles.listTitle}>
          <Text style={styles.font}>
            {type === "Credit" ? "Entrada" : "Saida"}
          </Text>
          {type === "Credit" && from && (
            <Text style={styles.colorText}>Origem: {from}</Text>
          )}
          {type === "Debit" && to && (
            <Text style={styles.colorText}>Destino: {to}</Text>
          )}
        </View>
      </View>
      <View style={styles.description}>
        <View>
          <Text style={styles.colorText}>
            {format(new Date(date), "dd/MM/yyyy")}
          </Text>
          <Text style={{ ...styles.price, ...styleValue }}>
            {"R$ " + formatCurrency(value)}
          </Text>
        </View>
        <View style={styles.edit}>
          <Button
            variant={"ghost"}
            style={styles.buttonTransaction}
            onPress={() => {
              edit(id);
            }}
            icon={
              <MaterialCommunityIcons
                size={12}
                color={theme.colors.gray20}
                name={"pencil"}
              />
            }
          />
          <Button
            variant={"ghost"}
            style={styles.buttonTransaction}
            onPress={() => {
              exclude(id);
            }}
            icon={
              <MaterialCommunityIcons
                size={12}
                color={theme.colors.gray20}
                name={"trash-can"}
              />
            }
          />
        </View>
      </View>
    </View>
  );
};

export default TransactionItem;

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
  exclude: () => void;
}

export interface Transaction {
  id?: string;
  type: "Credit" | "Debit";
  value: number;
  date: string;
  from?: string;
  to?: string;
  userId: string;
  deletedAt?: string;
}

const TransactionItem = ({ transaction, edit, exclude }: TransactionModal) => {
  const { id, date, to, from, value, type, deletedAt } = transaction;

  const styleValue = deletedAt
    ? ""
    : type === "Credit"
    ? styles.credit
    : styles.debit;
  const styleIcon = type === "Credit" ? styles.iconCredit : styles.iconDebit;

  return (
    <View style={styles.transaction}>
      <View style={{ ...styles.icon, ...styleIcon }}>
        <MaterialCommunityIcons
          name={type === "Credit" ? "trending-up" : "trending-down"}
          size={26}
          color={theme.colors.black}
        />
      </View>
      <View style={styles.transactionData}>
        <View style={styles.title}>
          <View style={styles.listTitle}>
            <Text style={styles.font}>
              {type === "Credit" ? "Entrada" : "Saída"}
            </Text>
            {type === "Credit" && from && (
              <Text style={styles.colorText}>Origem: {from}</Text>
            )}
            {type === "Debit" && to && (
              <Text style={styles.colorText}>Destino: {to}</Text>
            )}
          </View>
        </View>
        <Text
          style={{
            ...styles.price,
            ...styleValue,
            textDecorationLine: deletedAt ? "line-through" : undefined,
          }}
        >
          R$ {formatCurrency(value)}
        </Text>
      </View>
      <View>
        <Text style={styles.colorText}>
          {format(new Date(`${date}T00:00:00`), "dd/MM/yyyy")}
        </Text>
        {!deletedAt && (
          <View style={styles.edit}>
            <Button
              variant={"ghost"}
              style={styles.buttonTransaction}
              onPress={() => {
                edit(id);
              }}
              icon={
                <MaterialCommunityIcons
                  size={18}
                  color={theme.colors.gray20}
                  name={"pencil"}
                />
              }
            />
            <Button
              variant={"ghost"}
              style={styles.buttonTransaction}
              onPress={() => exclude()}
              icon={
                <MaterialCommunityIcons
                  size={18}
                  color={theme.colors.gray20}
                  name={"trash-can"}
                />
              }
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default TransactionItem;

import { View, Text } from "react-native";
import { Button } from "../../Button";
import { styles } from "./style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "@/theme";
import { formatCurrency } from "@/utils/formatCurrency";
import * as DocumentPicker from "expo-document-picker";
import { downloadFile } from "@/utils/file";
import { Timestamp } from "firebase/firestore";

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
  date: Timestamp | Date;
  from: string | null;
  to: string | null;
  userId: string;
  deletedAt?: string;
  attachment?: DocumentPicker.DocumentPickerAsset | null;
  attachmentUrl?: string | null;
}

const TransactionItem = ({ transaction, edit, exclude }: TransactionModal) => {
  const { id, date, to, from, value, type, deletedAt } = transaction;

  const stylesByType = type === "Credit" ? styles.credit : styles.debit;
  const styleValue = deletedAt ? "" : stylesByType;
  const styleIcon = type === "Credit" ? styles.iconCredit : styles.iconDebit;

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return "";

    const date = timestamp.toDate();

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

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
        <Text style={styles.colorText}>{formatDate(date as Timestamp)}</Text>
        {!deletedAt && (
          <View style={styles.edit}>
            {transaction.attachmentUrl && (
              <Button
                variant={"ghost"}
                style={styles.buttonTransaction}
                onPress={() =>
                  downloadFile(
                    transaction.attachmentUrl as string,
                    "download.pdf"
                  )
                }
                icon={
                  <MaterialCommunityIcons
                    size={18}
                    color={theme.colors.primary80}
                    name={"attachment"}
                  />
                }
              />
            )}

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

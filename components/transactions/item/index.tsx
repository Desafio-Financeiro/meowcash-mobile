import React from "react";
import { View, Text } from "react-native";
import { format } from "date-fns";
import { Button } from "@/components/button";
import { styles } from "./style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "@/theme";


export interface TransactionModal extends Omit<Props, "transactionsList"> {
  transaction: Transaction;
}

export interface Props {
  transactionsList: Transaction[];
  edit: (id: Transaction["id"]) => void;
  exclude: (id: Transaction["id"]) => void;
}

interface Transaction {
  id?: string;
  type: "Credit" | "Debit";
  value: number;
  date: string;
  from?: string;
  to?: string;
}

const TransactionItem = (transactionModal: TransactionModal) => {
  const { edit, transaction, exclude } = transactionModal;
  const { id, date, to, from, value, type } = transaction;

  const styleValue = type === "Credit" ? styles.Credit : styles.Debit;
  const styleIcon = type === "Credit" ? styles.iconCredit : styles.iconDebit;

  return (
    <View style={styles.transaction}>
      <View style={styles.title}>
        <View style={{ ...styles.icon, ...styleIcon }}>
          <MaterialCommunityIcons
            name={type === "Credit" ? "trending-down" : "trending-up"}
            size={26}
            color={theme.colors.black}
          />
        </View>
        <View style={styles.listTitle}>
          <Text>{type === "Credit" ? "Entrada" : "Saida"}</Text>
          {to && <Text style={styles.colorText}>{to}</Text>}
          {from && <Text style={styles.colorText}>{from}</Text>}
        </View>

      </View>
      <View style={styles.description}>
        <View>
          <Text style={styles.colorText}>{format(new Date(date), "dd/MM/yyyy")}</Text>
          <Text style={{ ...styles.price, ...styleValue }}>{"R$ " + value}</Text>
        </View>
        <View style={styles.edit}>
          <Button variant={"ghost"} style={styles.buttonTransaction} onPress={() => {
            edit(id);
          }} icon={(<MaterialCommunityIcons size={12} color={"#635D6C"} name={"pencil"} />)} />
          <Button variant={"ghost"} style={styles.buttonTransaction} onPress={() => {
            exclude(id);
          }} icon={(<MaterialCommunityIcons size={12} color={"#635D6C"} name={"trash-can"} />)} />

        </View>
      </View>

    </View>
  );
};

export default TransactionItem;
import TransactionItem, {
  type Transaction,
} from "@/components/transactions/TransactionItem";
import { styles } from "./style";
import { View } from "react-native";
import { Button } from "@/components/button";
import { useNavigation } from "@react-navigation/native";
import { useTransactions } from "@/context/TransactionsContext";

const StaticTransactionsList = ({ data }: { data: Transaction[] }) => {
  const navigation = useNavigation();
  const { showDeleteAlert } = useTransactions();

  return (
    <View>
      {data.map((transaction) => (
        <View key={transaction.id} style={styles.row}>
          <TransactionItem
            transaction={transaction}
            edit={() => {}}
            exclude={() => {
              showDeleteAlert(transaction);
            }}
          />
        </View>
      ))}
      <View style={{ width: 150, marginHorizontal: "auto" }}>
        <Button
          variant="primary"
          title="Ver extrato"
          style={{ marginTop: 24 }}
          onPress={() => navigation.navigate("Extract" as never)}
        />
      </View>
    </View>
  );
};

export default StaticTransactionsList;

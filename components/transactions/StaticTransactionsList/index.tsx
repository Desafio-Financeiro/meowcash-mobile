import TransactionItem, {
  type Transaction,
} from "@/components/Transactions/TransactionItem";
import { styles } from "./style";
import { View } from "react-native";
import { Button } from "@/components/button";
import { useNavigation } from "@react-navigation/native";

const StaticTransactionsList = ({ data }: { data: Transaction[] }) => {
  const navigation = useNavigation();

  return (
    <View>
      {data.slice(0, 6).map((transaction) => (
        <View key={transaction.id} style={styles.row}>
          <TransactionItem
            transaction={transaction}
            edit={() => {}}
            exclude={() => {}}
          />
        </View>
      ))}
      {data.length > 6 && (
        <Button
          variant="primary"
          title="Ver extrato"
          style={{ marginTop: 24 }}
          onPress={() => navigation.navigate("Extract" as never)}
        />
      )}
    </View>
  );
};

export default StaticTransactionsList;

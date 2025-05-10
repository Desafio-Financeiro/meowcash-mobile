import TransactionItem, {
  type Transaction,
} from "@/app/components/transactions/TransactionItem";
import { styles } from "./style";
import { View } from "react-native";
import { Button } from "../../Button";
import { useNavigation } from "@react-navigation/native";
import { useTransactions } from "@/context/TransactionsContext";
import { TransactionForm } from "../TransactionForm";
import { useEffect, useState } from "react";

interface StaticTransactionsListProps {
  data: Transaction[];
}

const StaticTransactionsList = ({ data }: StaticTransactionsListProps) => {
  const navigation = useNavigation();
  const { showDeleteAlert } = useTransactions();
  const [showAddTransactionDialog, setShowAddTransactionDialog] =
    useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<
    Transaction | undefined
  >(undefined);

  useEffect(() => {
    if (transactionToEdit) {
      setShowAddTransactionDialog(true);
    }
  }, [transactionToEdit, setShowAddTransactionDialog]);

  return (
    <>
      <TransactionForm
        onClose={() => {
          setShowAddTransactionDialog(false);
          setTransactionToEdit(undefined);
        }}
        open={showAddTransactionDialog}
        transactionToEdit={transactionToEdit}
      />
      <View>
        {data
          .filter((transaction) => !transaction.deletedAt)
          .map((transaction) => (
            <View key={transaction.id} style={styles.row}>
              <TransactionItem
                transaction={transaction}
                edit={() => {
                  setTransactionToEdit(transaction);
                }}
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
    </>
  );
};

export default StaticTransactionsList;

import { Picker } from "@react-native-picker/picker";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Dialog } from "@/components/dialog";
import { useMemo, useState } from "react";
import { DatePicker } from "@/components/datePicker";
import { theme } from "@/theme";
import { TextInput, View } from "react-native";
import { styles } from "./style";
import { addTransaction } from "@/api/transaction";
import { useAuth } from "@/context/AuthContext";
import { useTransactions } from "@/context/TransactionsContext";

export interface AddTransactionArgs {
  type: "Credit" | "Debit";
  value: number;
  date: string;
}

interface CreateTransactionProps {
  open: boolean;
  onClose: () => void;
}

export function CreateTransaction({ onClose, open }: CreateTransactionProps) {
  const { user } = useAuth();
  const { refetchTransactions, refetchBalance, refetchStatistics } =
    useTransactions();

  const [loading, setLoading] = useState<boolean>(false);
  const [steps, setSteps] = useState<"value" | "date" | "type" | "dictKey">(
    "value"
  );
  const [transactionValue, setTransactionValue] = useState<string>("");
  const [transactionType, setTransactionType] = useState<string>("Debit");
  const [transactionDate, setTransactionDate] = useState<Date>(new Date());
  const [transactionDictKey, setTransactionDictKey] = useState<string>("");

  const disableNextBtn = useMemo(() => {
    if (steps === "value") {
      return !transactionValue;
    }
    if (steps === "date") {
      return !transactionDate;
    }
    if (steps === "type") {
      return !transactionType;
    }
  }, [steps, transactionValue, transactionDate, transactionType]);

  function handleAddTransaction() {
    setLoading(true);
    addTransaction({
      type: transactionType as "Credit" | "Debit",
      value: parseFloat(transactionValue),
      date: transactionDate.toISOString().split("T")[0],
      to: transactionType === "Debit" ? transactionDictKey : null,
      from: transactionType === "Credit" ? transactionDictKey : null,
      userId: user!.uid,
    })
      .then(() => {
        refetchTransactions();
        refetchBalance();
        refetchStatistics();
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
        onClose();
        clearState();
      });
  }

  function handleNextStep() {
    setSteps((prev) => {
      if (prev === "value") {
        return "date";
      }
      if (prev === "date") {
        return "type";
      }

      if (prev === "type") {
        return "dictKey";
      }

      return "value";
    });
  }

  function clearState() {
    setTransactionDate(new Date());
    setTransactionValue("");
    setTransactionType("");
    setTransactionDictKey("");
    setSteps("value");
  }

  function getNexBtnText() {
    if (loading) return "Criando";
    if (steps === "dictKey") {
      return "Criar";
    }
    return "Avançar";
  }

  return (
    <Dialog.Root open={open} onClose={onClose}>
      {steps === "value" && (
        <>
          <Dialog.Title value="Qual é o valor da transação?" />
          <CurrencyInput onChange={(v) => setTransactionValue(v)} />
        </>
      )}

      {steps == "date" && (
        <>
          <Dialog.Title value="Qual a data da transação?" />
          <DatePicker
            dateStyle={styles.datePicker}
            value={transactionDate}
            onChange={(data) => {
              setTransactionDate(data);
            }}
            label="Data da transação"
          />
        </>
      )}

      {steps == "type" && (
        <>
          <Dialog.Title value="Como você gostaria de classificar essa transação?" />
          <View style={styles.selectContainer}>
            <Picker
              selectedValue={transactionType}
              onValueChange={(itemValue) => setTransactionType(itemValue)}
              mode="dialog"
            >
              <Picker.Item label="Crédito" value="Credit" />
              <Picker.Item label="Débito" value="Debit" />
            </Picker>
          </View>
        </>
      )}

      {steps == "dictKey" && (
        <>
          <Dialog.Title value="Para quem você gostaria de fazer essa essa transação" />
          <TextInput
            placeholder="Insira a chave pix"
            value={transactionDictKey}
            onChangeText={(v) => setTransactionDictKey(v)}
          />
        </>
      )}
      <Dialog.Actions>
        <Dialog.Button
          onClick={() => {
            onClose();
            clearState();
          }}
          value="Fechar"
        />
        <Dialog.Button
          onClick={() => {
            if (steps === "dictKey") {
              handleAddTransaction();
              return;
            }
            handleNextStep();
          }}
          value={getNexBtnText()}
          disabled={disableNextBtn || loading}
        />
      </Dialog.Actions>
    </Dialog.Root>
  );
}

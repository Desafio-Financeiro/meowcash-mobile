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
  value: string;
  date: Date;
  dictKey: string | null;
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
  const [transaction, setTransaction] = useState<AddTransactionArgs>({
    type: "Debit",
    value: "0",
    date: new Date(),
    dictKey: "",
  });

  const disableNextBtn = useMemo(() => {
    if (steps === "value") {
      return !transaction.type;
    }
    if (steps === "date") {
      return !transaction.date;
    }
    if (steps === "type") {
      return !transaction.type;
    }
  }, [steps, transaction.type, transaction.date, transaction.type]);

  function handleAddTransaction() {
    setLoading(true);
    addTransaction({
      type: transaction.type as "Credit" | "Debit",
      value: parseFloat(transaction.value),
      date: transaction.date.toISOString().split("T")[0],
      to: transaction.type === "Debit" ? transaction.dictKey : null,
      from: transaction.type === "Credit" ? transaction.dictKey : null,
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
    setTransaction({
      type: "Debit",
      value: "0",
      date: new Date(),
      dictKey: "",
    });
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
          <CurrencyInput
            onChange={(v) =>
              setTransaction((oldState) => ({ ...oldState, value: v }))
            }
          />
        </>
      )}

      {steps == "date" && (
        <>
          <Dialog.Title value="Qual a data da transação?" />
          <DatePicker
            dateStyle={styles.datePicker}
            value={transaction.date}
            onChange={(date) => {
              setTransaction((oldState) => ({ ...oldState, date }));
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
              selectedValue={transaction.type}
              onValueChange={(itemValue) =>
                setTransaction((oldState) => ({ ...oldState, type: itemValue }))
              }
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
          <Dialog.Title
            value={
              transaction.type === "Debit"
                ? "Para quem você gostaria de fazer essa essa transação"
                : "De quem você recebeu essa essa transação"
            }
          />
          <TextInput
            placeholder="Insira a chave pix"
            value={transaction.dictKey ?? undefined}
            inputMode="email"
            onChangeText={(v) =>
              setTransaction((oldState) => ({ ...oldState, dictKey: v }))
            }
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

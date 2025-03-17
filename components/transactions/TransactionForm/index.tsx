import { Picker } from "@react-native-picker/picker";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Dialog } from "@/components/dialog";
import { useEffect, useMemo, useState } from "react";
import { DatePicker } from "@/components/datePicker";
import { TextInput, View } from "react-native";
import { styles } from "./style";
import { addTransaction, updateTransaction } from "@/api/transaction";
import { useAuth } from "@/context/AuthContext";
import { useTransactions } from "@/context/TransactionsContext";
import { type Transaction } from "@/components/transactions/TransactionItem";
import * as DocumentPicker from "expo-document-picker";
import FileUploader from "@/components/fileUploader/FileUploader";
import { theme } from "@/theme";

export interface AddTransactionArgs {
  type: "Credit" | "Debit";
  value: string;
  date: Date;
  dictKey: string | null;
  attachment?: DocumentPicker.DocumentPickerAsset | null;
}

interface TransactionFormProps {
  transactionToEdit?: Transaction;
  open: boolean;
  onClose: () => void;
}

export function TransactionForm({
                                  onClose,
                                  open,
                                  transactionToEdit
                                }: TransactionFormProps) {
  const { user } = useAuth();
  const { refetchTransactions, refetchBalance, refetchStatistics } =
    useTransactions();

  const [loading, setLoading] = useState<boolean>(false);
  const [steps, setSteps] = useState<"value" | "date" | "type" | "dictKey" | "attachment">(
    "value"
  );
  const [transaction, setTransaction] = useState<AddTransactionArgs>({
    type: "Debit",
    value: "0",
    date: new Date(),
    dictKey: ""
  });

  useEffect(() => {
    setTransaction({
      type: transactionToEdit?.type ?? "Debit",
      value: transactionToEdit?.value ? String(transactionToEdit?.value) : "0",
      date: transactionToEdit?.date
        ? new Date(transactionToEdit?.date)
        : new Date(),
      dictKey:
        transactionToEdit?.type === "Debit"
          ? transactionToEdit?.to ?? ""
          : transactionToEdit?.from ?? ""
    });
  }, [open, transactionToEdit]);

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


  function formatDateToSave(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  async function handleAddTransaction() {
    setLoading(true);

    try {
      if (transactionToEdit?.id) {
        await updateTransaction({
          ...transactionToEdit,
          type: transaction.type as "Credit" | "Debit",
          value: parseFloat(transaction.value),
          date: formatDateToSave(transaction.date),
          to: transaction.type === "Debit" ? transaction.dictKey : null,
          from: transaction.type === "Credit" ? transaction.dictKey : null
        });
      } else {
        await addTransaction({
          type: transaction.type as "Credit" | "Debit",
          value: parseFloat(transaction.value),
          date: formatDateToSave(transaction.date),
          to: transaction.type === "Debit" ? transaction.dictKey : null,
          from: transaction.type === "Credit" ? transaction.dictKey : null,
          userId: user!.uid,
          attachment: transaction.attachment
        });
      }

      refetchTransactions();
      refetchBalance();
      refetchStatistics();
      setLoading(false);
    } catch (error) {
      console.error("Erro ao adicionar transação: ", error);
    } finally {
      setLoading(false);
      onClose();
      clearState();
    }
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

      if (prev === "dictKey") {
        return "attachment";
      }

      return "value";
    });
  }

  function clearState() {
    setTransaction({
      type: "Debit",
      value: "0",
      date: new Date(),
      dictKey: ""
    });
    setSteps("value");
  }

  function getNexBtnText() {
    if (loading && transactionToEdit?.id) return "Editando";
    if (loading) return "Criando";
    if (steps === "attachment") {
      return transactionToEdit?.id ? "Editar" : "Criar";
    }
    return "Avançar";
  }

  return (
    <Dialog.Root open={open} onClose={onClose}>
      {steps === "value" && (
        <>
          <Dialog.Title value="Qual é o valor da transação?" />
          <CurrencyInput
            defaultValue={transaction.value}
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
              <Picker.Item color={theme.colors.text} label="Crédito" value="Credit" />
              <Picker.Item color={theme.colors.text} label="Débito" value="Debit" />
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
            placeholderTextColor={theme.colors.text}
            value={transaction.dictKey ?? undefined}
            inputMode="email"
            onChangeText={(v) =>
              setTransaction((oldState) => ({ ...oldState, dictKey: v }))
            }
          />
        </>
      )}

      {steps == "attachment" && (
        <>
          <Dialog.Title value="Anexar comprovante" />
          <View style={styles.attachmentContainer}>
            <FileUploader
              setFile={(file) => {
                setTransaction((oldState) => ({ ...oldState, attachment: file }));
              }}
              file={transaction.attachment}
            />
          </View>
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
            if (steps === "attachment") {
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

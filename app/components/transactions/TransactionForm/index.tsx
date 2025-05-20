import { Picker } from "@react-native-picker/picker";
import { CurrencyInput } from "@/app/components/CurrencyInput";
import { Dialog } from "../../Dialog";
import { useEffect, useMemo, useState } from "react";
import { DatePicker } from "../../DatePicker";
import { TextInput, View } from "react-native";
import { styles } from "./style";
import { useAuth } from "@/context/AuthContext";
import { useTransactions } from "@/context/TransactionsContext";
import { type Transaction } from "@/app/components/transactions/TransactionItem";
import * as DocumentPicker from "expo-document-picker";
import FileUploader from "@/app/components/FileUploader/FileUploader";
import { theme } from "@/theme";
import { Timestamp } from "firebase/firestore";
import {
  updateTransaction,
  addTransaction,
} from "@/domain/usecases/TransactionsUseCases";
import Toast from "react-native-toast-message";

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
  transactionToEdit,
}: Readonly<TransactionFormProps>) {
  const { user } = useAuth();
  const { refetchTransactions, refetchBalance, refetchStatistics } =
    useTransactions();

  const [loading, setLoading] = useState<boolean>(false);
  const [steps, setSteps] = useState<
    "value" | "date" | "type" | "dictKey" | "attachment"
  >("value");
  const [transaction, setTransaction] = useState<AddTransactionArgs>({
    type: "Debit",
    value: "0",
    date: new Date(),
    dictKey: "",
  });

  useEffect(() => {
    setTransaction({
      type: transactionToEdit?.type ?? "Debit",
      value: transactionToEdit?.value ? String(transactionToEdit?.value) : "0",
      date: transactionToEdit?.date
        ? (transactionToEdit.date as unknown as Timestamp).toDate()
        : new Date(),
      dictKey:
        transactionToEdit?.type === "Debit"
          ? transactionToEdit?.to ?? ""
          : transactionToEdit?.from ?? "",
    });
  }, [open, transactionToEdit]);

  const isValueValid = useMemo(() => {
    const parsedValue = parseFloat(transaction.value);
    return !isNaN(parsedValue) && parsedValue > 0;
  }, [transaction.value]);

  const isTypeValid = useMemo(() => {
    return transaction.type === "Credit" || transaction.type === "Debit";
  }, [transaction.type]);

  const isDictKeyValid = useMemo(() => {
    if (steps !== "dictKey") return true;
    if (!transaction?.dictKey) return false;
    return transaction?.dictKey.trim().length > 0;
  }, [transaction.dictKey, steps]);

  const isInvalidDate = useMemo(() => {
    return transaction.date < new Date();
  }, [transaction.date]);

  const disableNextBtn = useMemo(() => {
    switch (steps) {
      case "value":
        return !isValueValid;
      case "date":
        return !isInvalidDate;
      case "type":
        return !isTypeValid;
      case "dictKey":
        return !isDictKeyValid;
      default:
        return false;
    }
  }, [steps, isValueValid, transaction.date, isTypeValid, isDictKeyValid]);

  async function handleAddTransaction() {
    setLoading(true);

    try {
      if (transactionToEdit?.id) {
        try {
          await updateTransaction({
            ...transactionToEdit,
            type: transaction.type,
            value: parseFloat(transaction.value),
            date: transaction.date,
            to: transaction.type === "Debit" ? transaction.dictKey : null,
            from: transaction.type === "Credit" ? transaction.dictKey : null,
            attachment: transaction.attachment,
          });

          Toast.show({
            type: "success",
            text1: "Transação editada com sucesso!",
            position: "bottom",
          });
        } catch {
          Toast.show({
            type: "error",
            text1: "Erro ao editar transação",
            position: "bottom",
          });
        }
      } else {
        try {
          await addTransaction({
            type: transaction.type,
            value: parseFloat(transaction.value),
            date: transaction.date,
            to: transaction.type === "Debit" ? transaction.dictKey : null,
            from: transaction.type === "Credit" ? transaction.dictKey : null,
            userId: user!.uid,
            attachment: transaction.attachment,
          });

          Toast.show({
            type: "success",
            text1: "Transação adicionada!",
            position: "bottom",
          });
        } catch {
          Toast.show({
            type: "error",
            text1: "Erro ao adicionar transação",
            position: "bottom",
          });
        }
      }

      refetchTransactions();
      refetchBalance();
      refetchStatistics();
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
      if (prev === "value") return "date";
      if (prev === "date") return "type";
      if (prev === "type") return "dictKey";
      if (prev === "dictKey") return "attachment";
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

  function handleClose() {
    onClose();
    clearState();
  }

  function getNextBtnText() {
    if (loading && transactionToEdit?.id) return "Editando";
    if (loading) return "Criando";
    if (steps === "attachment")
      return transactionToEdit?.id ? "Editar" : "Criar";
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

      {steps === "date" && (
        <>
          <Dialog.Title value="Qual a data da transação?" />
          <DatePicker
            dateStyle={styles.datePicker}
            value={transaction.date}
            useFutureDate={false}
            onChange={(date) => {
              setTransaction((oldState) => ({ ...oldState, date }));
            }}
            label="Data da transação"
          />
        </>
      )}

      {steps === "type" && (
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
              <Picker.Item
                color={theme.colors.text}
                label="Crédito"
                value="Credit"
              />
              <Picker.Item
                color={theme.colors.text}
                label="Débito"
                value="Debit"
              />
            </Picker>
          </View>
        </>
      )}

      {steps === "dictKey" && (
        <>
          <Dialog.Title
            value={
              transaction.type === "Debit"
                ? "Para quem você gostaria de fazer essa transação?"
                : "De quem você recebeu essa transação?"
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

      {steps === "attachment" && (
        <>
          <Dialog.Title value="Anexar comprovante" />
          <View style={styles.attachmentContainer}>
            <FileUploader
              setFile={(file) => {
                setTransaction((oldState) => ({
                  ...oldState,
                  attachment: file,
                }));
              }}
              file={transaction.attachment}
            />
          </View>
        </>
      )}
      <Dialog.Actions>
        <Dialog.Button onClick={handleClose} value="Fechar" />
        <Dialog.Button
          onClick={() =>
            steps === "attachment" ? handleAddTransaction() : handleNextStep()
          }
          value={getNextBtnText()}
          disabled={disableNextBtn || loading}
        />
      </Dialog.Actions>
    </Dialog.Root>
  );
}

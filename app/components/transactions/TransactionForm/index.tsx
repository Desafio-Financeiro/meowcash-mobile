import { Picker } from "@react-native-picker/picker";
import { CurrencyInput } from "@/app/components/CurrencyInput";
import { useEffect, useMemo, useState } from "react";
import { DatePicker } from "@/app/components/DatePicker";
import { TextInput, View } from "react-native";
import { styles } from "./style";
import { type Transaction } from "@/app/components/transactions/TransactionItem";
import * as DocumentPicker from "expo-document-picker";
import FileUploader from "@/app/components/FileUploader/FileUploader";
import { theme } from "@/theme";
import { Timestamp } from "firebase/firestore";

import { useHandleTransaction } from "@/store/hooks/useHandleTransaction";
import { Dialog } from "@/app/components/Dialog";
import { useAppSelector } from "@/store/redux/hooks";

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
  const user = useAppSelector((state) => state.auth.user);

  const {
    setTransaction,
    transaction,
    setLoading,
    loading,
    createTransaction,
    editTransaction,
    invalidateQueries,
  } = useHandleTransaction();

  const [steps, setSteps] = useState<
    "value" | "date" | "type" | "dictKey" | "attachment"
  >("value");

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
    if (!user) return;

    setLoading(true);

    try {
      if (transactionToEdit?.id) {
        await editTransaction(transactionToEdit);
      } else {
        await createTransaction();
      }

      invalidateQueries();
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

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import { theme } from "@/theme";
import React, { useState } from "react";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

export const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 4,
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    color: theme.colors.text,
    borderWidth: 0,
    borderBottomWidth: 1
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  label: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    paddingHorizontal: 4,
    color: theme.colors.text
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  datePickerContainer: {
    backgroundColor: theme.colors.background,
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center"
  },
  button: {
    padding: 10,
    alignItems: "center",
    marginTop: 10
  },
  buttonConfirm: {
    padding: 10,
    alignItems: "center",
    backgroundColor: theme.colors.primary70,
    borderRadius: 12,
    marginTop: 10
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontFamily: theme.fonts.regular
  },
  buttonTextPrimary: {
    color: theme.colors.white,
    fontSize: 16,
    fontFamily: theme.fonts.regular
  }
});

interface DataPickerProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
}

export function DataPicker({ label, value, onChange }: DataPickerProps) {
  const [show, setShow] = useState(false);

  const onChangeDate = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      onChange(date);
    }
  };

  const confirmDate = () => {
    setShow(false);
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Text onPress={() => setShow(true)} style={styles.input}>
          {value.toLocaleDateString()}
        </Text>

        <Modal transparent visible={show} animationType="fade">
          <TouchableWithoutFeedback onPress={() => setShow(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.datePickerContainer}>
                <RNDateTimePicker
                  value={value}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onChangeDate}
                  textColor={theme.colors.text}

                />
                <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%" }}>
                  <TouchableOpacity style={styles.button} onPress={() => setShow(false)}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonConfirm} onPress={confirmDate}>
                    <Text style={styles.buttonTextPrimary}>Confirmar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </View>
  );
}

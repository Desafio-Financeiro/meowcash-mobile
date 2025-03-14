import {
  Platform,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StyleProp,
  TextStyle
} from "react-native";
import { Appearance } from "react-native";
import { theme } from "@/theme";
import React, { useState } from "react";
import RNDateTimePicker, {
  DateTimePickerEvent
} from "@react-native-community/datetimepicker";
import { styles } from "./styles";

interface DatePickerProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  dateStyle?: StyleProp<TextStyle>;
}

export function DatePicker({
                             label,
                             value,
                             onChange,
                             dateStyle
                           }: DatePickerProps) {
  const colorScheme = Appearance.getColorScheme();

  const [show, setShow] = useState(false);

  const onChangeDate = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      onChange(date);
    }
    if (Platform.OS === "android") {
      setShow(false);
    }
  };

  const confirmDate = () => {
    setShow(false);
  };

  if (Platform.OS === "android") {
    return (
      <View>
        <Text onPress={() => setShow(true)} style={[styles.input, dateStyle]}>
          {value.toLocaleDateString()}
        </Text>

        {show && (
          <RNDateTimePicker
            value={value}
            mode="date"
            locale={"pt-BR"}
            display={"spinner"}
            onChange={onChangeDate}
            textColor={
              colorScheme === "dark" ? theme.colors.white : theme.colors.text
            }
          />
        )}
      </View>
    );
  }

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
                  locale={"pt-BR"}
                  display={"spinner"}
                  onChange={onChangeDate}
                  textColor={theme.colors.text}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "100%"
                  }}
                >
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setShow(false)}
                  >
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonConfirm}
                    onPress={confirmDate}
                  >
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

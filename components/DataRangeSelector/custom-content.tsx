import { Text, View } from "react-native";
import { DatePicker } from "../DatePicker";
import { styles } from "./styles";

interface CustomContentProps {
  handleDateChange: (type: "start" | "end", value: Date) => void;
  date: {
    start: Date;
    end: Date;
  };
}

export function CustomContent({ handleDateChange, date }: CustomContentProps) {
  return (
    <View style={styles.customContent}>
      <View style={styles.customOption}>
        <Text>Data inicial </Text>
        <DatePicker
          dateStyle={styles.dateStyle}
          value={date.start}
          onChange={(data) => {
            handleDateChange("start", data);
          }}
          label="Data inicial"
        />
      </View>
      <View style={styles.customOption}>
        <Text>Data final</Text>
        <DatePicker
          dateStyle={styles.dateStyle}
          value={date.end}
          onChange={(data) => {
            handleDateChange("end", data);
          }}
          label="Data final"
        />
      </View>
    </View>
  );
}

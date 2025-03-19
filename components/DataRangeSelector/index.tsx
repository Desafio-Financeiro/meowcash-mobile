import { View, Text, TouchableOpacity } from "react-native";
import { BottomSheet } from "../BottomSheet";
import { styles } from "./styles";
import { useState } from "react";
import { periods } from "./constant";
import { Title } from "./title";
import { CustomContent } from "./custom-content";

interface DateRangeSelectorProps {
  onDateChange: (start: Date | null, end: Date | null) => void;
  open: boolean;
  onClose: () => void;
}

type period = "today" | "last_7_days" | "last_30_days" | "this_year" | "custom";

export function DateRangeSelector({
  onDateChange,
  onClose,
  open,
}: DateRangeSelectorProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [date, setDate] = useState({
    start: new Date(),
    end: new Date(),
  });
  function handlePeriodSelection(period: period) {
    setSelectedPeriod(period);

    if (period !== "custom") {
      const date = getDateBasedOnPeriod(period);
      setDate(date);
      onDateChange(date.start, date.end);
      onClose();
    }
  }

  function onChangeCustomDate(type: "start" | "end", value: Date) {
    const currentDate = new Date(value || new Date());

    if (type === "start") {
      setDate((prevDate) => ({
        ...prevDate,
        start: new Date(currentDate),
      }));
    }

    if (type === "end") {
      setDate((prevDate) => ({
        ...prevDate,
        end: new Date(currentDate),
      }));
    }

    onDateChange(date.start, date.end);
    onClose();
  }

  function getDateBasedOnPeriod(period: period) {
    if (period === "today") {
      return {
        start: new Date(),
        end: new Date(),
      };
    }
    if (period === "last_7_days") {
      const date = new Date();
      date.setDate(date.getDate() - 7);
      return {
        start: date,
        end: new Date(),
      };
    }
    if (period === "last_30_days") {
      const date = new Date();
      date.setDate(date.getDate() - 30);
      return {
        start: date,
        end: new Date(),
      };
    }
    if (period === "this_year") {
      const date = new Date();
      date.setMonth(0);
      date.setDate(1);
      return {
        start: date,
        end: new Date(),
      };
    }
    return {
      start: new Date(),
      end: new Date(),
    };
  }

  return (
    <BottomSheet
      onClose={onClose}
      title={
        <Title
          handlePress={() => setSelectedPeriod("")}
          type={selectedPeriod}
        />
      }
      visible={open}
    >
      <View style={styles.container}>
        {selectedPeriod === "custom" ? (
          <CustomContent handleDateChange={onChangeCustomDate} date={date} />
        ) : (
          periods.map((period) => (
            <TouchableOpacity
              key={period.value}
              activeOpacity={0.7}
              onPress={() => handlePeriodSelection(period.value as period)}
            >
              <Text style={styles.option}>{period.label}</Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </BottomSheet>
  );
}

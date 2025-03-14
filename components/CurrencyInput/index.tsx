import { TextInput } from "react-native-gesture-handler";

import { useState } from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import { theme } from "@/theme";

interface CurrencyInputProps {
  onChange: (value: string) => void;
}

export function CurrencyInput({ onChange }: CurrencyInputProps) {
  const [value, setValue] = useState<string | undefined>();

  function handleChange(inputValue: string) {
    const unformatedValue = parseFloat(inputValue.replace(/[,.]/g, ""));
    const formatedValue = isNaN(unformatedValue)
      ? ""
      : formatCurrency(unformatedValue);

    setValue(formatedValue);
    onChange(unformatedValue.toString());
  }

  return (
    <TextInput
      inputMode="decimal"
      placeholderTextColor={theme.colors.text}
      value={value}
      onChange={(e) => handleChange(e.nativeEvent.text)}
      placeholder="0,00"
    />
  );
}

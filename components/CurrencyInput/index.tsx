import { TextInput } from "react-native-gesture-handler";

import { useState } from "react";
import { formatCurrency } from "@/utils/formatCurrency";

interface CurrencyInputProps {
  defaultValue?: string;
  onChange: (value: string) => void;
}

export function CurrencyInput({ onChange, defaultValue }: CurrencyInputProps) {
  const [value, setValue] = useState<string | undefined>(() =>
    defaultValue ? formatCurrency(parseFloat(defaultValue)) : undefined
  );

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
      value={value}
      onChange={(e) => handleChange(e.nativeEvent.text)}
      placeholder="0,00"
    />
  );
}

import { Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { theme } from "@/theme";
import { styles } from "./style";

export type SelectItem = { label: string; value: string | number };

interface SelectProps {
  options: SelectItem[];
  placeholder: string;
  setSelectedValue: (selectedItem: SelectItem) => void;
}

export default function Select({
  options,
  placeholder,
  setSelectedValue,
}: Readonly<SelectProps>) {
  return (
    <SelectDropdown
      data={options}
      onSelect={(selectedItem) => {
        setSelectedValue(selectedItem);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownStyle}>
            <Text style={styles.text}>
              {selectedItem ? selectedItem.label : placeholder}
            </Text>
            {isOpened ? (
              <AntDesign name="caretup" size={12} color={theme.colors.text} />
            ) : (
              <AntDesign name="caretdown" size={12} color={theme.colors.text} />
            )}
          </View>
        );
      }}
      renderItem={(item, _, isSelected) => {
        return (
          <View
            style={{
              ...styles.item,
              ...(isSelected && { backgroundColor: theme.colors.primary30 }),
            }}
          >
            <Text style={styles.text}>{item.label}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.list}
    />
  );
}

import { Text, View, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { theme } from "@/theme";

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
}: SelectProps) {
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
              {(selectedItem && selectedItem.label) || placeholder}
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

const styles = StyleSheet.create({
  dropdownStyle: {
    width: "100%",
    height: 56,
    backgroundColor: theme.colors.white,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.gray30,
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
  },
  list: {
    backgroundColor: theme.colors.white,
    borderRadius: 4,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  item: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});

import { TouchableOpacity, View, Text } from "react-native";
import { BottomSheet } from "../BottomSheet";
import { styles } from "./styles";

interface OptionsSelectorProps {
  open: boolean;
  onClose: () => void;
  handleOptionSelection: (option: string) => void;
}

export function OptionsSelector({
  onClose,
  open,
  handleOptionSelection,
}: OptionsSelectorProps) {
  return (
    <BottomSheet onClose={onClose} title={"Movimentações"} visible={open}>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            handleOptionSelection("Credit");
            onClose();
          }}
        >
          <Text style={styles.option}>Crédito</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            handleOptionSelection("Debit");
            onClose();
          }}
        >
          <Text style={styles.option}>Débito</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
}

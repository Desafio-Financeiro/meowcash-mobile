import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "@/theme";

interface TitleProps {
  handlePress: () => void;
  type: string;
}

export function Title({ handlePress, type }: TitleProps) {
  if (type !== "custom") return "Período";
  return (
    <TouchableOpacity style={styles.customTitleContainer} onPress={handlePress}>
      <MaterialIcons
        name="keyboard-arrow-left"
        size={24}
        color={theme.colors.primary60}
      />
      <Text style={styles.customTitle}>Período personalizado</Text>
    </TouchableOpacity>
  );
}

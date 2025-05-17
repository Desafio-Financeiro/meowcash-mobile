import { Text, TextInput, TextInputProps, View } from "react-native";
import { styles } from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "@/theme";

interface InputProps extends TextInputProps {
  label: string;
  endIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  endIconOnPress?: () => void;
}
export function Input({
  label,
  endIconOnPress,
  endIcon,
  ...rest
}: Readonly<InputProps>) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput accessibilityLabel={label} {...rest} style={styles.input} />
        <MaterialCommunityIcons
          name={endIcon}
          size={16}
          color={theme.colors.black}
          style={endIcon ? styles.icon : styles.iconHidden}
          onPress={endIconOnPress}
        />
      </View>
    </View>
  );
}

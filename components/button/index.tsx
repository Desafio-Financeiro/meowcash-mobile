import { Text, Pressable, PressableProps } from "react-native";
import { styles } from "./style";

interface ButtonProps extends PressableProps {
  title: string;
  variant: "primary" | "ghost";
  disabled?: boolean;
}

export function Button({ variant, disabled, title, ...rest }: ButtonProps) {
  const textColorStyle =
    variant === "primary" ? styles.buttonTextPrimary : styles.buttonTextGhost;
  const backgroundColorStyle =
    variant === "primary" ? styles.buttonPrimary : styles.buttonGhost;

  const disabledBackgroundStyle = disabled ? styles.buttonPrimaryDisabled : {};

  const disabledTextStyle = disabled ? styles.buttonTextPrimaryDisabled : {};

  return (
    <Pressable
      {...rest}
      disabled={disabled}
      style={[styles.buttonBase, backgroundColorStyle, disabledBackgroundStyle]}
    >
      <Text style={[textColorStyle, disabledTextStyle]}>{title}</Text>
    </Pressable>
  );
}

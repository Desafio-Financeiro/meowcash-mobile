import { Text, Pressable, PressableProps } from 'react-native';
import { styles } from './style';
import React from 'react';

interface ButtonProps extends PressableProps {
  title?: string;
  variant: "primary" | "ghost" | "link";
  disabled?: boolean;
  useButtonBase?: boolean;
  style?: object;
  icon?: React.ReactNode;
}

export function Button({
                         variant,
                         disabled,
                         title,
                         useButtonBase = true,
                         style = {},
                         icon,
                         ...rest
                       }: ButtonProps) {
  const textColorStyle =
    variant === 'primary'
      ? styles.buttonTextPrimary
      : variant === "link"
      ? styles.buttonTextLink
      : styles.buttonTextGhost;
  const backgroundColorStyle =
    variant === 'primary' ? styles.buttonPrimary : styles.buttonGhost;

  const disabledBackgroundStyle = disabled ? styles.buttonPrimaryDisabled : {};

  const disabledTextStyle = disabled ? styles.buttonTextPrimaryDisabled : {};

  return (
    <Pressable
      {...rest}
      disabled={disabled}
      style={[useButtonBase ? styles.buttonBase : '', backgroundColorStyle, disabledBackgroundStyle, style]}
    >
      {icon && icon}
      {title && <Text style={[textColorStyle, disabledTextStyle]}>{title}</Text>}
    </Pressable>
  );
}

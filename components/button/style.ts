import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  buttonBase: {
    width: "100%",
    padding: 12,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonTextGhost: {
    color: theme.colors.primary60,
    fontFamily: theme.fonts.regular,
  },

  buttonTextPrimary: {
    color: theme.colors.white,
    fontFamily: theme.fonts.regular,
  },

  buttonPrimary: {
    backgroundColor: theme.colors.primary60,
  },

  buttonGhost: {
    backgroundColor: "transparent",
  },

  buttonPrimaryDisabled: {
    backgroundColor: theme.colors.disabled,
  },

  buttonTextPrimaryDisabled: {
    color: theme.colors.disabled,
  },
});

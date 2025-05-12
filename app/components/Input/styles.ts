import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 4,
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    color: theme.colors.text,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  inputContainer: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
  },

  icon: {
    position: "absolute",
    padding: 12,
  },

  iconHidden: {
    display: "none",
  },

  label: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    paddingHorizontal: 4,
    color: theme.colors.text,
  },
});

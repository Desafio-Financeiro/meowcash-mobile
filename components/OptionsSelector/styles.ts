import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 2,
  },

  option: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
});

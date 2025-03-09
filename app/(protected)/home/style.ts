import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 16,
    overflowY: "auto",
    gap: 14,
    backgroundColor: theme.colors.background,
  },

  summaryContainer: { gap: 14 },

  hello: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.primary70,
  },

  date: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.textSecondary,
  },
});

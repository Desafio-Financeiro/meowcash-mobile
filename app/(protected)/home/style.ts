import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: 16,
    gap: 14,
    backgroundColor: theme.colors.primary20,
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

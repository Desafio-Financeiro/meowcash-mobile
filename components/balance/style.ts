import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 88,
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.gray10,
    borderRadius: 8,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  title: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: theme.colors.textSecondary,
  },

  balance: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.black,
  },
});

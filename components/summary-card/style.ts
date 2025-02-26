import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 108,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.gray10,
    borderRadius: 8,
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    gap: 4,
  },
  title: {
    fontSize: 14,
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
  },
  value: {
    fontSize: 16,
    color: theme.colors.black,
    fontFamily: theme.fonts.medium,
  },
  period: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.regular,
  },
});

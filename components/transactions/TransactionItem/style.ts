import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export const styles = StyleSheet.create({
  transaction: {
    display: "flex",
    flexDirection: "row",
    gap: 14,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    borderTopColor: theme.colors.gray10,
    flexGrow: 1,
    fontFamily: theme.fonts.regular,
    padding: 12,
  },

  title: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  listTitle: {
    color: theme.colors.black,
    fontSize: 16,
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  font: {
    fontFamily: theme.fonts.regular,
  },
  colorText: {
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
  },
  description: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    flexDirection: "row",
  },
  edit: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
  },

  date: {
    textAlign: "right",
    color: theme.colors.text,
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  price: {
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 24,
    letterSpacing: 0.15,
    textAlign: "right",
  },

  debit: {
    color: theme.colors.dangerDark,
  },

  credit: {
    color: theme.colors.successDark,
  },

  buttonTransaction: {
    padding: 6,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: theme.colors.gray10,
    backgroundColor: theme.colors.white,
    color: theme.colors.gray20,
  },

  icon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 42,
    height: 42,
    borderRadius: 50,
  },

  iconCredit: {
    backgroundColor: theme.colors.success,
  },

  iconDebit: {
    backgroundColor: theme.colors.danger,
  },
});

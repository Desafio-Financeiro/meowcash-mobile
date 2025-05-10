import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export const styles = StyleSheet.create({
  transaction: {
    display: "flex",
    flexDirection: "row",
    gap: 14,
    justifyContent: "space-between",
    alignSelf: "stretch",
    borderTopColor: theme.colors.gray10,
    flexGrow: 1,
    fontFamily: theme.fonts.regular,
    padding: 12
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: 15
  },
  listTitle: {
    color: theme.colors.black,
    fontSize: 16,
    textOverflow: "ellipsis",
    overflow: "hidden",
    gap: 4
  },
  font: {
    fontFamily: theme.fonts.semibold,
    fontSize: 16,
    gap: 8
  },
  colorText: {
    color: theme.colors.text,
    fontFamily: theme.fonts.regular
  },
  edit: {
    marginTop: 18,
    display: "flex",
    flexDirection: "row",
    gap: 12,
    justifyContent: "flex-end"
  },
  price: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    lineHeight: 24,
    letterSpacing: 0.15
  },
  debit: {
    color: theme.colors.dangerDark
  },
  credit: {
    color: theme.colors.successDark
  },
  buttonTransaction: {
    padding: 6,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: theme.colors.gray10,
    backgroundColor: theme.colors.white,
    color: theme.colors.gray20,
    width: 40,
    height: 40
  },
  icon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 42,
    height: 42,
    borderRadius: 50
  },
  iconCredit: {
    backgroundColor: theme.colors.success
  },
  iconDebit: {
    backgroundColor: theme.colors.danger
  },
  transactionData: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: "100%",
    justifyContent: "space-between"
  },
  attachmentIcon: {
    transform: [{ rotate: "90deg" }]
  }
});

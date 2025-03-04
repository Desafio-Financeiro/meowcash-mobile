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
    borderTopColor: "#CAC4D0",
    flexGrow: 1,
    fontFamily: theme.fonts.regular
  },

  title: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: 15

  },

  listTitle: {
    color: "#28262B",
    fontSize: 16,
    textOverflow: "ellipsis",
    overflow: "hidden"

  },
  font: {
    fontFamily: theme.fonts.regular
  },
  colorText: {
    color: "#635D6C",
    fontFamily: theme.fonts.regular
  },
  description: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    flexDirection: "row"
  },
  edit: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4
  },

  date: {
    textAlign: "right",
    color: "#635D6C",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 24,
    letterSpacing: 0.15
  },
  price: {
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 24,
    letterSpacing: 0.15,
    textAlign: "right"
  },

  Debit: {
    color: "#B3261E"
  },

  Credit: {
    color: "#3E6642"
  },

  buttonTransaction: {
    padding: 6,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#CAC4D0",
    backgroundColor: "#FFF",
    color: "#635D6C"
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
    backgroundColor: "#D1E7DD"
  },

  iconDebit: {
    backgroundColor: "#FDCECB"
  }

});

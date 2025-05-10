import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  body: {
    paddingBottom: 15,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  screen: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
    paddingBottom: 24,
  },
  button: { width: "50%", marginHorizontal: "auto" },
  footer: {
    width: "100%",
    marginTop: 24,
  },
});

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 4,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#000",
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
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    paddingHorizontal: 4,
    color: "#000",
  },
});

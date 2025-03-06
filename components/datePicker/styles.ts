import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 4,
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    color: theme.colors.text,
    borderWidth: 0,
    borderBottomWidth: 1
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  label: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    paddingHorizontal: 4,
    color: theme.colors.text
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  datePickerContainer: {
    backgroundColor: theme.colors.background,
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center"
  },
  button: {
    padding: 10,
    alignItems: "center",
    marginTop: 10
  },
  buttonConfirm: {
    padding: 10,
    alignItems: "center",
    backgroundColor: theme.colors.primary70,
    borderRadius: 12,
    marginTop: 10
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontFamily: theme.fonts.regular
  },
  buttonTextPrimary: {
    color: theme.colors.white,
    fontSize: 16,
    fontFamily: theme.fonts.regular
  }
});
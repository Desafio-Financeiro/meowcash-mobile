import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    margin: 0,
  },

  content: {
    width: "80%",
    backgroundColor: theme.colors.white,
    padding: 16,
    borderRadius: 12,
  },

  title: {
    fontSize: 22,
    fontFamily: theme.fonts.regular,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
    gap: 8,
  },

  buttonText: {
    padding: 8,
    color: theme.colors.primary70,
    fontFamily: theme.fonts.regular,
  },
});

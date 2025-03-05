import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    width: 220,
    height: 265,
    gap: 12,
    borderRadius: 4,
    borderWidth: 2,
    padding: 20,
    borderColor: theme.colors.primary40,
    backgroundColor: theme.colors.primary10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    marginLeft: 8,
    marginRight: 8,
  },
  text: {
    fontFamily: theme.fonts.regular,
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    color: theme.colors.primary70,
  },
});

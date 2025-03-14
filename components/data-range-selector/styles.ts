import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 2,
  },

  option: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },

  customTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  customTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
  },

  customContent: {
    gap: 4,
    paddingHorizontal: 20,
  },

  customOption: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dateStyle: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    borderWidth: 1,
    color: theme.colors.text,
    borderColor: theme.colors.gray10,
    paddingHorizontal: 8,
    paddingTop: 8,
    borderRadius: 4,
  },
});

import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  filtersContainer: {
    height: 70,
    maxHeight: 70,
  },
  filtersContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    gap: 12,
  },

  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.gray10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },

  filterButtonActive: {
    borderColor: theme.colors.primary60,
  },

  filterButtonText: {
    fontFamily: theme.fonts.medium,
  },

  filterButtonActiveText: {
    color: theme.colors.primary60,
  },
});

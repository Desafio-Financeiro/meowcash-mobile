import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  filtersContainer: {
    height: 70,
    maxHeight: 70
  },
  filtersContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    gap: 12
  },

  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.gray10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8
  },

  filterButtonActive: {
    borderColor: theme.colors.primary60
  },

  filterButtonText: {
    fontFamily: theme.fonts.medium
  },

  filterButtonActiveText: {
    color: theme.colors.primary60
  },

  searchContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 4,
    borderRadius: 8,
    backgroundColor: theme.colors.primary20
  },
  searchInput: {
    display: "flex",
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 10,
    flex: 1,
    height: 46,
    borderRadius: 8,
    color: theme.colors.text,
    backgroundColor: theme.colors.primary20
  },
  searchIcon: {
    display: "flex",
    width: 48,
    height: 48,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10
  }
});

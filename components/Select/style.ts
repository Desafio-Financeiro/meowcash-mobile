import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export const styles = StyleSheet.create({
  dropdownStyle: {
    width: "100%",
    height: 56,
    backgroundColor: theme.colors.white,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.gray30,
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
  },
  list: {
    backgroundColor: theme.colors.white,
    borderRadius: 4,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  item: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});

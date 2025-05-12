import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },

  wrapper: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "auto",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: theme.colors.gray10,
    borderBottomWidth: 1,
  },

  headerContent: {
    padding: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  headerTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
  },

  content: { padding: 16 },
});

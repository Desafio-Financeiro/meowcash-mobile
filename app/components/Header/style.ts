import { Platform, StatusBar } from "react-native";
import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: theme.colors.primary20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
    height: Platform.OS === "android" ? 56 + StatusBar.currentHeight! : 88,
  },
  drawerContent: {
    backgroundColor: theme.colors.primary10,
    paddingTop: 24,
  },
  drawerLabel: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
  },
  popover: {
    backgroundColor: "white",
    position: "absolute",
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 8,
    right: 16,
    top: 80,
    borderColor: theme.colors.primary90,
    borderWidth: 1,
  },
});

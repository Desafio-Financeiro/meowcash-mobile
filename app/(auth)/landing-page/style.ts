import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  landingPageContainer: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: 24,
  },

  header: {
    gap: 12,
    position: "relative",
    borderBottomColor: theme.colors.text,
    borderBottomWidth: 6,
    paddingBottom: 26,
    paddingLeft: 16,
    paddingRight: 16,
  },

  headerTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: 20,
    color: theme.colors.text,
    width: "80%",
  },

  headerSubtitle: {
    fontFamily: theme.fonts.light,
    fontSize: 16,
    color: theme.colors.text,
  },

  loginMessage: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    zIndex: 10,
  },

  loginMessageTitle: {
    color: theme.colors.black,
    fontSize: 20,
    fontFamily: theme.fonts.bold,
  },

  buttonContainer: {
    width: 162,
    marginTop: 16,
  },

  catPaw: {
    position: "absolute",
    right: 0,
    top: 20,
  },

  waves: {
    position: "absolute",
    left: -16,
    top: 200,
  },
});

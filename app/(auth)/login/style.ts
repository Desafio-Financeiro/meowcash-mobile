import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  formContainer: { width: 300, gap: 20 },

  headerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },

  headerTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: 20,
    marginVertical: 8,
    marginTop: 24,
  },

  registerTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },

  registerLink: {
    fontFamily: theme.fonts.semibold,
    color: theme.colors.primary60,
  },
});

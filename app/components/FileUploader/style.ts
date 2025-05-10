import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export const styles = StyleSheet.create({
  fileInfo: {
    marginTop: 15,
    alignItems: "center"
  },
  fileName: {
    fontSize: 16,
    fontFamily: theme.fonts.bold
  },
  fileSize: {
    fontSize: 16,
    color: theme.colors.text
  },
  removeFile: {
    color: theme.colors.dangerDark
  }
});

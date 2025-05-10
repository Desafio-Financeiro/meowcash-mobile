import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  footer: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
    paddingTop: 32,
    backgroundColor: theme.colors.primary60,
    color: theme.colors.white,
    display: "flex",
    gap: 32,
  },
  textContainer: {
    display: "flex",
    gap: 16,
  },
  text: {
    color: theme.colors.white,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
  },
  copyright: {
    padding: 10,
    backgroundColor: theme.colors.gray20,
    display: "flex",
    gap: 6,
  },
  copyrightText: {
    textAlign: "center",
    color: theme.colors.white,
    fontSize: 12,
    fontFamily: theme.fonts.regular,
  },
  socialMediaContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  socialMedia: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

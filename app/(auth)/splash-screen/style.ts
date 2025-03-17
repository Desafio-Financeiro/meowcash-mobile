import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary20,
    position: "relative",
    gap: 48,
  },
  pulse: {
    width: 100,
    height: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  absoluteContainer: { position: "absolute", bottom: -120, right: 0 },
});

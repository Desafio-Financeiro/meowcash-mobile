import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  summaryContainer: { gap: 14 },
  legend: {
    height: 18,
    width: 18,
    marginRight: 10,
    borderRadius: 4,
  },
  legendContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  text: { color: theme.colors.text, fontSize: 16 },
  chartTitle: {
    color: theme.colors.primary70,
    fontSize: 24,
    fontFamily: theme.fonts.medium,
    marginBottom: 12,
  },
  chart: {
    borderRadius: 10,
    paddingVertical: 24,
    backgroundColor: theme.colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.gray10,
    marginTop: 24,
  },
});

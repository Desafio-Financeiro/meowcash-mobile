import { Dimensions, StyleSheet } from "react-native";

const screenHeight = Dimensions.get("window").height;
export const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc"
  },
  headerText: {
    fontSize: 20
  },
  text: {
    fontSize: 16
  },
  list: {
    height: screenHeight - 250
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

import { Dimensions, StyleSheet } from "react-native";

const screenHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  list: {
    height: screenHeight - 250,
  },
});

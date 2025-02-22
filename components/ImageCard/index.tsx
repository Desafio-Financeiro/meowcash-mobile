import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { theme } from "@/theme";
import type { SvgProps } from "react-native-svg";

interface ImageCardProps {
  Icon: (props: SvgProps) => React.JSX.Element;
  Illustration: (props: SvgProps) => React.JSX.Element;
  text: string;
}

export default function ImageCard({
  Icon,
  Illustration,
  text,
}: ImageCardProps) {
  return (
    <View style={styles.container}>
      <Icon />
      <Text style={styles.text}>{text}</Text>
      <Illustration />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 220,
    height: 265,
    gap: 12,
    borderRadius: 4,
    borderWidth: 2,
    padding: 20,
    borderColor: theme.colors.primary40,
    backgroundColor: theme.colors.primary10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
  },
  text: {
    fontFamily: theme.fonts.regular,
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    color: theme.colors.primary70,
  },
});

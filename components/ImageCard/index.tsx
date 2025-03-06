import { View, Text } from "react-native";
import type { SvgProps } from "react-native-svg";
import { styles } from "./style";

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

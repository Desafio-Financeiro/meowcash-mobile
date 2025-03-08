import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const SvgComponent = (props: SvgProps) => (
  <Svg width={59} height={59} fill="none" {...props}>
    <Path
      fill="#AB5373"
      d="M46.43 4.377H12.538a4.856 4.856 0 0 0-4.842 4.842V43.11a4.856 4.856 0 0 0 4.842 4.842h9.683l5.544 5.543c.944.945 2.47.945 3.413 0l5.568-5.543h9.684a4.856 4.856 0 0 0 4.842-4.842V9.219a4.856 4.856 0 0 0-4.842-4.842Zm-12.395 26.34-4.551 9.973-4.551-9.974-9.974-4.551 9.974-4.551 4.55-9.974 4.552 9.974 9.974 4.55-9.974 4.552Z"
    />
  </Svg>
);
export default SvgComponent;

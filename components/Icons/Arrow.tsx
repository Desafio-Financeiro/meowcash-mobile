import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const Arrow = (props: SvgProps) => (
  <Svg width="26" height="26" viewBox="0 0 26 26" fill="none" {...props}>
    <Path
      d="M17.3334 6.5L19.8142 8.98083L14.5275 14.2675L10.1942 9.93417L2.16669 17.9725L3.69419 19.5L10.1942 13L14.5275 17.3333L21.3525 10.5192L23.8334 13V6.5H17.3334Z"
      fill="black"
    />
  </Svg>
);
export default Arrow;

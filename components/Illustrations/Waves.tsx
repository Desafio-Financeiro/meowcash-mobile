import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const SvgComponent = (props: SvgProps) => (
  <Svg width={700} height={176} fill="none" {...props}>
    <Path
      fill="#E4BDC8"
      d="M135.709 11.74c-66.062-28.023-134.293.632-160.15 18.462L-87 176h534c-2.836-64.063-11.211-188.022-22.021-171.36-13.512 20.828-206.693 42.13-289.27 7.1Z"
    />
  </Svg>
);
export default SvgComponent;

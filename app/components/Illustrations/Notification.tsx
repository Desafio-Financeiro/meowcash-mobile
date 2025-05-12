import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const Notification = (props: SvgProps) => (
  <Svg width={153} height={67} fill="none" {...props}>
    <Path
      fill="#AB5373"
      stroke="#AB5373"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.901}
      d="M134.58 5.765H14.737C7.124 5.765.952 11.936.952 19.549v32.38c0 7.614 6.172 13.785 13.785 13.785H134.58c7.613 0 13.784-6.171 13.784-13.784V19.55c0-7.614-6.171-13.785-13.784-13.785Z"
    />
    <Path
      fill="#F8EBEE"
      stroke="#AB5373"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.901}
      d="M138.229 1.582H18.387c-7.613 0-13.785 6.171-13.785 13.785v32.38c0 7.613 6.172 13.784 13.785 13.784H138.23c7.614 0 13.785-6.171 13.785-13.784v-32.38c0-7.614-6.171-13.785-13.785-13.785Z"
    />
    <Path
      fill="#AB5373"
      stroke="#AB5373"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.901}
      d="M41.603 22.401A13.728 13.728 0 1 1 27.875 8.674 13.709 13.709 0 0 1 41.603 22.4Z"
    />
    <Path
      stroke="#AB5373"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.901}
      d="M53.81 17.116h81.738M53.81 30.843h81.738M53.81 44.552h81.738"
    />
  </Svg>
);
export default Notification;

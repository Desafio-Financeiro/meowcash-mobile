import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const Savings = (props: SvgProps) => (
  <Svg width={59} height={59} fill="none" {...props}>
    <Path
      fill="#AB5373"
      d="m48.846 19.608-5.496-5.496c.17-1.017.436-1.96.775-2.784a3.62 3.62 0 0 0 .218-2.106c-.315-1.743-2.01-2.953-3.8-2.93-3.85.073-7.264 1.962-9.442 4.842H18.996c-7.36 0-13.314 5.956-13.314 13.315 0 5.447 3.316 18.108 5.035 24.306a4.852 4.852 0 0 0 4.672 3.534h4.818a4.856 4.856 0 0 0 4.841-4.842h4.842a4.856 4.856 0 0 0 4.842 4.842h4.866a4.874 4.874 0 0 0 4.648-3.462l3.026-10.07 5.18-1.743a2.421 2.421 0 0 0 1.647-2.3V22.028c0-1.331-1.09-2.42-2.42-2.42h-2.833Zm-18.956 3.63h-7.262a2.428 2.428 0 0 1-2.421-2.42c0-1.332 1.09-2.42 2.42-2.42h7.263c1.332 0 2.421 1.088 2.421 2.42 0 1.331-1.09 2.42-2.42 2.42Zm9.684 4.843a2.428 2.428 0 0 1-2.421-2.421c0-1.332 1.09-2.421 2.42-2.421 1.332 0 2.422 1.09 2.422 2.42 0 1.332-1.09 2.422-2.421 2.422Z"
    />
  </Svg>
);
export default Savings;

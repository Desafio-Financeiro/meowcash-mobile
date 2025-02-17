import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const Cat = (props: SvgProps) => (
  <Svg width={48} height={46} fill="none" {...props}>
    <Path
      fill="#AB5373"
      d="M.063 25.53c-.183 2.198.076 4.975.229 6.088.412 1.645 1.995 5.558 5.035 8.056 0 0 1.76 1.365 3.799 2.563 1.804 1.061 3.865 1.958 4.531 2.152 3.341 1.098 8.102 1.922 14.052 1.418 5.95-.503 10.39-3.112 11.397-3.57.806-.366 2.89-1.867 3.744-2.599 4.77-5.172 4.302-6.18 4.77-7.837.06-.396.22-1.794.366-4.21.183-3.021-1.42-12.45-2.747-16.844-1.327-4.394-3.753-8.285-5.263-10.024-1.209-1.392-2.64-.458-3.204.183-.763.778-2.371 2.435-2.7 2.838-.33.402-2.732 3.493-3.891 4.989 0 0-2.748-.494-5.676-.55-2.768-.052-5.692.327-6.774.55 0 0-5.722-6.912-7.095-8.102C9.538-.32 8.41.234 7.981.631c-.412.55-1.52 2.096-2.654 3.89-1.4 2.212-2.932 7.27-3.413 8.86l-.02.066C1.436 14.957.292 22.785.063 25.531Z"
    />
  </Svg>
);
export default Cat;

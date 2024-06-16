import * as React from 'react';

import Svg, {Path, G, SvgProps, Defs, ClipPath} from 'react-native-svg';

const Asks = ({width = 25, height = 25, ...props}: SvgProps) => (
  <Svg width={width} height={height} fill="none" viewBox="0 0 25 25" {...props}>
    <G clipPath="url(#clip0_1_168)">
      <Path fill="#F6465D" d="M4.931 4.945h7v16h-7v-16z"></Path>
      <Path
        fill="#848E9C"
        fillRule="evenodd"
        d="M13.931 4.945h7v4h-7v-4zm0 6h7v4h-7v-4zm7 6h-7v4h7v-4z"
        clipRule="evenodd"></Path>
    </G>
    <Defs>
      <ClipPath id="clip0_1_168">
        <Path
          fill="#fff"
          d="M0 0H24V24H0z"
          transform="translate(.931 .945)"></Path>
      </ClipPath>
    </Defs>
  </Svg>
);

export default Asks;

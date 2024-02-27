import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={35}
      height={32}
      viewBox="0 0 35 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M33.762 12.539H21.358L17.608 1l-3.75 11.539H1.454l10.096 6.923L7.656 31l9.952-7.212L27.56 31l-3.894-11.538 10.096-6.923z"
        stroke="#000"
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;

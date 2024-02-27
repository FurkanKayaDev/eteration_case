import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={37}
      height={32}
      viewBox="0 0 37 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M2.984 11.506a1.673 1.673 0 00-1.675 1.658c-.002.153.02.305.066.452l4.243 14.963A3.32 3.32 0 008.828 31h19.108a3.356 3.356 0 003.225-2.421l4.244-14.963.05-.452a1.673 1.673 0 00-1.675-1.658H2.984zM18.85 24.645a3.453 3.453 0 113.47-3.453 3.47 3.47 0 01-3.47 3.453v0z"
        stroke="#000"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M10.502 11.506L18.382 1l7.88 10.506"
        stroke="#000"
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;

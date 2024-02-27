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
      <Path transform="translate(1 1)" fill="#fff" d="M0 0H32.309V30H0z" />
      <Path
        d="M4.462 12.826v17.02A1.154 1.154 0 005.616 31h6.923v-9.808a1.73 1.73 0 011.73-1.731h5.77a1.73 1.73 0 011.731 1.73V31h6.924a1.154 1.154 0 001.153-1.154v-17.02"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M33.309 16L17.939 1.286c-.36-.38-1.203-.385-1.57 0L1 16M27.54 10.446V2.153h-3.462v4.976"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;

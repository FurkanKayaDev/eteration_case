import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={31}
      height={32}
      viewBox="0 0 31 32"
      fill={props.fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M21.954 7.923c-.282 3.813-3.173 6.923-6.346 6.923s-6.068-3.11-6.346-6.923C8.974 3.957 11.786 1 15.608 1s6.635 3.029 6.346 6.923z"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.608 19.462c-6.274 0-12.642 3.461-13.82 9.995-.142.787.304 1.543 1.128 1.543H28.3c.825 0 1.271-.756 1.13-1.543-1.18-6.534-7.548-9.995-13.822-9.995v0z"
        stroke="#000"
        strokeWidth={2}
        strokeMiterlimit={10}
      />
    </Svg>
  );
}

export default SvgComponent;

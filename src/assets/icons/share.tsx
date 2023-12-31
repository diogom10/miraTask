import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

interface IShareIconProps extends SvgProps {}

export const ShareIcon: React.FC<IShareIconProps> = ({...props}) => (
  <Svg viewBox="0 0 512 512" {...props}>
    <Path d="M378 324a69.78 69.78 0 0 0-48.83 19.91L202 272.41a69.68 69.68 0 0 0 0-32.82l127.13-71.5A69.76 69.76 0 1 0 308.87 129l-130.13 73.2a70 70 0 1 0 0 107.56L308.87 383A70 70 0 1 0 378 324z" />
  </Svg>
);

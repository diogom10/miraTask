import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

interface ICheckIconProps extends SvgProps {}

export const CheckIcon: React.FC<ICheckIconProps> = ({...props}) => (
  <Svg viewBox="0 0 512 512" {...props}>
    <Path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm-38 312.38-80.6-89.57 23.79-21.41 56 62.22L350 153.46 374.54 174z" />
  </Svg>
);

import * as React from 'react';
import Svg, {Circle, SvgProps} from 'react-native-svg';

interface IMenuIconProps extends SvgProps {}

export const MenuIcon: React.FC<IMenuIconProps> = ({...props}) => (
  <Svg viewBox="0 0 512 512" {...props}>
    <Circle cx={256} cy={256} r={48} />
    <Circle cx={256} cy={416} r={48} />
    <Circle cx={256} cy={96} r={48} />
  </Svg>
);

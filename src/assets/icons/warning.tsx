import * as React from 'react';
import Svg, {Mask, Path, SvgProps} from 'react-native-svg';

interface IWarningProps extends SvgProps {}

export const Warning: React.FC<IWarningProps> = ({...props}) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path
      d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 6h2v8h-2v-8zm1 12.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"
      fill={props?.fill || '#B80000'}
    />
  </Svg>
);

import Toast from 'react-native-simple-toast';

interface IToastProps {
  message: string;
  duration: number;
}

export const showToastMessage = ({message, duration}: IToastProps) => {
  Toast.show(message, duration);
};

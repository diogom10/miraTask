import Toast from 'react-native-simple-toast';
import {Alert} from 'react-native';
import {AlertButton} from 'react-native/Libraries/Alert/Alert';

interface IToastProps {
  message: string;
  duration: number;
}

interface IAlertProps {
  title: string;
  subtitle?: string;
  buttons: AlertButton[];
}

export const showToastMessage = ({message, duration}: IToastProps) => {
  Toast.show(message, duration);
};

export const showDefaultAlert = ({title, subtitle, buttons}: IAlertProps) => {
  Alert.alert(title, subtitle, buttons);
};

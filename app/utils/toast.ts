import Toast, { ToastType } from 'react-native-toast-message';

export const displayToast = (type: ToastType, title: string, text: string) => {
  return Toast.show({
    type,
    text1: title,
    text2: text,
    topOffset: 60,
  });
};

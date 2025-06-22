import { Dimensions } from 'react-native';

const { height } = Dimensions.get('screen');

export const fontSize = {
  small: height * 0.014,
  body: height * 0.016,
  normal: height * 0.018,
  large: height * 0.022,
  extra: height * 0.024,
};

export const colors = {
  main: 'grey',
  secondary: 'lightgrey',
  backdrop: '#e6e8e8',
  textDark: '#424141',
  textLight: 'white',
  shadow: 'rgba(0, 0, 0)',
};

import { Dimensions } from "react-native";

const {height} = Dimensions.get('screen');

export const fontSize = {
  small: height * 0.014,
  body: height * 0.016,
  normal: height * 0.018,
  large: height * 0.022,
  extra: height * 0.024,
};
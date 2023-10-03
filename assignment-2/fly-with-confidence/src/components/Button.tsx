import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";
import { getBackgroundColorStyle, getTextColorStyle } from "../helpers/GetColorStyle";

interface ButtonProps {
  text: string,
  buttonColor?: string,
  textColor?: string,
  customStyles?: Object,
  onPress?: () => void
}

const Button: React.FC<ButtonProps> = ({ text, buttonColor, textColor, customStyles, onPress }) => {
  const buttonColorStyle = buttonColor ? getBackgroundColorStyle(buttonColor) : globalStyles.buttonPrimary;
  const textColorStyle = textColor ? getTextColorStyle(textColor) : null;

  return (
    <TouchableOpacity
      style={[globalStyles.button, buttonColorStyle, customStyles]}
      onPress={onPress}
    >
      <Text style={[globalStyles.buttonText, textColorStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

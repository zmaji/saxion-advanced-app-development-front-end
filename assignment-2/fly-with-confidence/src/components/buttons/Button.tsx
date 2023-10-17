import React from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';
import { buttonStyles } from '../../styles/buttons';
import { getBackgroundColorStyle, getTextColorStyle } from '../../helpers/getColorStylesHelper';

interface ButtonProps {
  text: string,
  buttonColor?: string,
  textColor?: string,
  customStyles?: ViewStyle,
  onPress?: () => void
}

const Button: React.FC<ButtonProps> = ({ text, buttonColor, textColor, customStyles, onPress }) => {
  const buttonColorStyle = buttonColor ? getBackgroundColorStyle(buttonColor) : null;
  const textColorStyle = textColor ? getTextColorStyle(textColor) : null;

  return (
    <TouchableOpacity
      style={[buttonStyles.button, buttonColorStyle, customStyles]}
      onPress={onPress}
    >
      <Text style={[buttonStyles.buttonText, textColorStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

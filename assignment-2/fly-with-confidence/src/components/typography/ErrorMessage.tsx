import { Text } from "react-native";
import React from "react";
import { getTextColorStyle } from "../../helpers/getColorStylesHelper";
import { typographyStyles } from "../../styles/typography";

interface ErrorMessageProps {
  content: string,
  color?: string,
  customStyles?: object
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ content, color = '', customStyles }) => {
  const colorStyle = getTextColorStyle(color);

  return (
    <Text style={[typographyStyles.regularText, colorStyle, customStyles]}>{content}</Text>
  );
};

export default ErrorMessage;


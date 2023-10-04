import { Text } from "react-native";
import React from "react";
import { getTextColorStyle } from "../../helpers/getColorStylesHelper";
import { typographyStyles } from "../../styles/typography";

interface TextTitleProps {
  content: string,
  color?: string,
  customStyles?: object
}

const TextTitle: React.FC<TextTitleProps> = ({ content, color = '', customStyles }) => {
  const colorStyle = getTextColorStyle(color);

  return (
    <Text style={[typographyStyles.pageTitle, colorStyle, customStyles]}>{content}</Text>
  );
};

export default TextTitle;


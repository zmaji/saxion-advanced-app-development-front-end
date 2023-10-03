import { Text } from "react-native";
import React from "react";
import { getTextColorStyle } from "../../helpers/getColorStylesHelper";
import { typographyStyles } from "../../styles/typography";

interface TextSubTitleProps {
  content: string,
  color?: string,
  customStyles?: object
}

const TextSubTitle: React.FC<TextSubTitleProps> = ({ content, color = '', customStyles }) => {
  const colorStyle = getTextColorStyle(color);

  return (
    <Text style={[typographyStyles.pageSubTitle, colorStyle, customStyles]}>{content}</Text>
  );
};

export default TextSubTitle;


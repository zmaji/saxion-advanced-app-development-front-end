import { Text } from "react-native";
import React from "react";
import { getColorStyle } from "../helpers/GetColorStyle";
import { typographyStyles } from "../styles/typography";

interface TextTitleProps {
    content: string,
    color?: string
}

const TextTitle: React.FC<TextTitleProps> = ({ content, color = '' }) => {
    const colorStyle = getColorStyle(color);

    return (
        <Text style={[typographyStyles.pageTitle, colorStyle]}>{content}</Text>
    );
};

export default TextTitle;


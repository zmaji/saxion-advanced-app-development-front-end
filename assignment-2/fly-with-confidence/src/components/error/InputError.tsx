import { Text } from 'react-native';
import React from 'react';
import { getTextColorStyle } from '../../helpers/getColorStylesHelper';
import { typographyStyles } from '../../styles/typography';

interface ErrorMessageProps {
  content: string,
  color?: string,
  customStyles?: object
}

const InputError: React.FC<ErrorMessageProps> = ({ content, color = '', customStyles }) => {
  const colorStyle = getTextColorStyle(color);

  return (
    <Text style={[typographyStyles.formInputError, colorStyle, customStyles]}>{content}</Text>
  );
};

export default InputError;


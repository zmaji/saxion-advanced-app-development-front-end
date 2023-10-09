import { Text } from 'react-native';
import React from 'react';
import { getTextColorStyle } from '../../helpers/getColorStylesHelper';
import { typographyStyles } from '../../styles/typography';

interface FormLabelProps {
  content: string,
  color?: string,
  customStyles?: object
}

const FormLabel: React.FC<FormLabelProps> = ({ content, color = '', customStyles }) => {
  const colorStyle = getTextColorStyle(color);

  return (
    <Text style={[typographyStyles.formLabel, colorStyle, customStyles]}>{content}</Text>
  );
};

export default FormLabel;


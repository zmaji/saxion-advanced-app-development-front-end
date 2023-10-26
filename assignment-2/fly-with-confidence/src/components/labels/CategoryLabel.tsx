import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import { labelStyles } from '../../styles/labels';
import { getBackgroundColorStyle, getTextColorStyle } from '../../helpers/getColorStylesHelper';

interface LabelProps {
  text: string,
  labelColor?: string,
  textColor?: string,
  customStyles?: ViewStyle,
}

const CategoryLabel: React.FC<LabelProps> = ({ text, labelColor, textColor, customStyles }) => {
  const labelColorStyle = labelColor ? getBackgroundColorStyle(labelColor) : null;
  const textColorStyle = textColor ? getTextColorStyle(textColor) : null;

  return (
    <View
      style={[labelStyles.label, labelColorStyle, customStyles]}
    >
      <Text style={[labelStyles.labelText, textColorStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  commentItem: {

  },
});

export default CategoryLabel;

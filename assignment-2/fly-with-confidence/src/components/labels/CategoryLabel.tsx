import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import { getBackgroundColorStyle, getTextColorStyle } from '../../helpers/getColorStylesHelper';
import {themeColors} from "../../styles/themeColors";

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
      style={[styles.label, labelColorStyle, customStyles]}
    >
      <Text style={[styles.labelText, textColorStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 1,
    backgroundColor: themeColors.primary,
  },
  labelText: {
    fontFamily: 'Montserrat-Medium',
    color: 'white',
    textAlign: 'center',
  },
});

export default CategoryLabel;

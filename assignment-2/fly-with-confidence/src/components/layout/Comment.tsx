import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { fontFamilyStyles, typographyStyles } from '../../styles/typography';
import { globalStyles } from '../../styles/global';
import { getBackgroundColorStyle, getTextColorStyle } from '../../helpers/getColorStylesHelper';
import { themeColors } from '../../styles/themeColors';

interface CommentProps {
  username?: string,
  date?: string,
  content: string,
  commentColor?: string,
  textColor?: string,
  customStyles?: object
}

const Comment: React.FC<CommentProps> = ({ username, content, date, commentColor, textColor, customStyles }) => {
  const commentColorStyle = commentColor ? getBackgroundColorStyle(commentColor) : null;
  const textColorStyle = textColor ? getTextColorStyle(textColor) : null;

  return (
    <View
      style={[globalStyles.defaultShadow, commentColorStyle, textColorStyle, customStyles]}
    >
      <View style={styles.commentContainer}>
        <Text style={[styles.commentText, fontFamilyStyles.montserratBold]}>{username}</Text>
        <Text style={[styles.commentDate]}> · {date}</Text>
      </View>
      <Text style={[styles.commentText]}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row'
  },
  commentText: {
    fontSize: 16,
    color: themeColors.darkGrey,
    marginBottom: 5,
    ...fontFamilyStyles.montserratRegular
  },
  commentDate: {
    fontSize: 16,
    color: themeColors.grey,
    marginBottom: 10,
    ...fontFamilyStyles.montserratRegular
  },
  marginBottom: {
    marginBottom: 10
  }
});

export default Comment;
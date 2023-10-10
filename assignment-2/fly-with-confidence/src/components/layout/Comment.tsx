import React from 'react';
import { Text, View } from 'react-native';
import { fontFamilyStyles, typographyStyles } from '../../styles/typography';
import { globalStyles } from '../../styles/global';
import { getBackgroundColorStyle, getTextColorStyle } from '../../helpers/getColorStylesHelper';

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
      <View style={globalStyles.flexDirectionRow}>
        <Text style={[typographyStyles.userDisplay, fontFamilyStyles.montserratBold]}>{username}</Text>
        <Text style={[typographyStyles.commentDate]}> · {date}</Text>
      </View>
      <Text style={[typographyStyles.commentText]}>{content}</Text>
    </View>
  );
};

export default Comment;
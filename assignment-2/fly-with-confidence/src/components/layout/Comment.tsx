import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fontFamilyStyles } from '../../styles/typography';
import { globalStyles } from '../../styles/global';
import { themeColors } from '../../styles/themeColors';

interface CommentProps {
  username: string,
  date: string,
  content: string,
}

const Comment: React.FC<CommentProps> = ({ username, content, date }) => {
  return (
    <View
      style={[globalStyles.defaultShadow, styles.commentItem]}
    >
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.userDisplay, fontFamilyStyles.montserratBold]}>{username}</Text>
        <Text style={[styles.commentDate]}> · {date}</Text>
      </View>
      <Text style={[styles.commentText]}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  commentItem: {
    borderRadius: 5,
    marginBottom: 20,
    padding: 20,
    backgroundColor: themeColors.darkWhite,
  },
  commentText: {
    fontSize: 16,
    color: themeColors.darkGrey,
    marginBottom: 5,
    ...fontFamilyStyles.montserratRegular,
  },
  commentDate: {
    fontSize: 16,
    color: themeColors.grey,
    marginBottom: 10,
    ...fontFamilyStyles.montserratRegular,
  },
  userDisplay: {
    fontSize: 16,
    color: themeColors.darkGrey,
    marginBottom: 5,
    ...fontFamilyStyles.montserratBold,
  },
});

export default Comment;

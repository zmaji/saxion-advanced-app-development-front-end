import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { themeColors, themeColorUtils } from "../styles/themeColors";
import { fontFamilyStyles } from "../styles/typography";
import { globalStyles } from "../styles/global";

type ForumOverviewItemProps = {
  title: string,
  onPress: () => void;
};

const ForumOverviewItem: React.FC<ForumOverviewItemProps> = ({ title, onPress }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      style={[styles.forumOverviewItem, globalStyles.marginBottom, isPressed && styles.forumOverviewItemPressed]}
      onPress={onPress}
    >
      <Image source={require('../../assets/images/article-banner.jpg')} style={styles.forumOverviewItemImage} />
      <Text style={[styles.forumOverviewItemTitle, isPressed && themeColorUtils.textColorPrimary]}>{title}</Text>

      <View style={styles.readLinkContainer}>
        <Text style={styles.readLinkText}>View post</Text>

        <FontAwesomeIcon icon={faEye} color={themeColors.primary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  forumOverviewItem: {
    backgroundColor: themeColors.white,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  forumOverviewItemImage: {
    height: 80,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 5,
  },
  forumOverviewItemPressed: {
    backgroundColor: themeColors.primary + 25
  },
  forumOverviewItemTitle: {
    fontSize: 14,
    marginBottom: 5,
    ...fontFamilyStyles.montserratMedium,
  },
  readLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readLinkText: {
    fontSize: 14,
    marginRight: 5,
    color: themeColors.primary,
    textDecorationLine: 'underline',
    ...fontFamilyStyles.loraItalic
  }
});

export default ForumOverviewItem;

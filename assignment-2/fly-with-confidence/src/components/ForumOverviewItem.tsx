import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faComment, faFaceSmile, faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import { themeColors, themeColorUtils } from "../styles/themeColors";
import { fontFamilyStyles } from "../styles/typography";
import { globalStyles } from "../styles/global";

type ForumOverviewItemProps = {
  title: string,
  comments: number,
  likes: number,
  dislikes: number,
  image: string,
  content: string,
  categories: string[],
  onPress: () => void;
};

const ForumOverviewItem: React.FC<ForumOverviewItemProps> = ({ title, content, comments, likes, dislikes, image, categories, onPress }) => {
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

      <View style={styles.titleContainer}>
        <Text style={[styles.forumOverviewItemTitle, isPressed && themeColorUtils.textColorPrimary]}>{title}</Text>

        <View style={styles.buttonsContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryButton]}
            >
              <Text style={styles.categoryButtonText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {image !== '' ? (<Image source={require('../../assets/images/article-banner.jpg')} style={styles.forumOverviewItemImage} />) : (null)}

      <Text style={[styles.forumOverviewItemContent]}>{content}</Text>

      <View style={styles.readLinkContainer}>
        <View style={styles.readLinkContent}>
          <Text style={styles.readLinkText}>View post</Text>
          <FontAwesomeIcon style={styles.viewIcon} icon={faEye} color={themeColors.primary} />
        </View>

        <View style={styles.extraInfoContainer}>
          <FontAwesomeIcon style={styles.extraInfoIcon} icon={faComment} color={themeColors.grey} />
          <Text style={styles.extraInfoText}>{comments}</Text>

          <FontAwesomeIcon style={styles.extraInfoIcon} icon={faFaceSmile} color={themeColors.grey} />
          <Text style={styles.extraInfoText}>{likes}</Text>

          <FontAwesomeIcon style={styles.extraInfoIcon} icon={faFaceFrown} color={themeColors.grey} />
          <Text style={styles.extraInfoText}>{dislikes}</Text>
        </View>
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
    fontSize: 16,
    marginBottom: 5,
    ...fontFamilyStyles.montserratMedium,
    ...fontFamilyStyles.montserratBold
  },
  forumOverviewItemContent: {
    fontSize: 14,
    marginBottom: 10,
    ...fontFamilyStyles.montserratMedium,
  },
  readLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readLinkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
  },
  readLinkText: {
    fontSize: 14,
    marginRight: 5,
    color: themeColors.primary,
    textDecorationLine: 'underline',
    ...fontFamilyStyles.loraItalic
  },
  extraInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  extraInfoText: {
    marginRight: 10
  },
  extraInfoIcon: {
    marginRight: 5
  },
  viewIcon: {
    marginTop: 2.5
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: themeColors.lightGrey,
    borderRadius: 10,
    padding: 10,
    fontSize: 1,
    marginLeft: 10
  }
});

export default ForumOverviewItem;
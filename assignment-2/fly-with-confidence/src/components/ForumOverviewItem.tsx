import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faEye,
  faComment,
  faFaceSmile,
  faFaceFrown,
} from '@fortawesome/free-regular-svg-icons';
import { BASE_URL } from '../../config';
import { themeColors, themeColorUtils } from '../styles/themeColors';
import { fontFamilyStyles } from '../styles/typography';
import { globalStyles } from '../styles/global';
import CategoryLabel from './labels/CategoryLabel';

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

const ForumOverviewItem: React.FC<ForumOverviewItemProps> = ({
  title,
  content,
  comments,
  likes,
  dislikes,
  image,
  categories,
  onPress,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const imageUrl = BASE_URL + '/uploads/posts/' + image;

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

        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <CategoryLabel
              key={index}
              text={category}
              labelColor='darkWhite'
              textColor='grey'
              customStyles={styles.categoryLabel}
            />
          ))}
        </View>
      </View>

      {
        image !== '' ? (
          <Image source={{ uri: imageUrl }} style={styles.forumOverviewItemImage} testID="forum-item-image" />
        ) : null
      }

      <Text
        style={styles.forumOverviewItemContent}
        numberOfLines={3}
        ellipsizeMode="tail"
      >
        {content}
      </Text>

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
    borderRadius: 5,
  },
  forumOverviewItemImage: {
    height: 120,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 5,
  },
  forumOverviewItemPressed: {
    backgroundColor: themeColors.primary + 25,
  },
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  forumOverviewItemTitle: {
    fontSize: 16,
    marginBottom: 5,
    marginRight: 10,
    ...fontFamilyStyles.montserratSemiBold,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  categoryLabel: {
    marginRight: 10,
    marginBottom: 5,
    marginTop: 4,
    fontSize: 12,
  },
  forumOverviewItemContent: {
    fontSize: 16,
    marginBottom: 10,
    ...fontFamilyStyles.montserratRegular,
  },
  readLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readLinkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  readLinkText: {
    fontSize: 18,
    marginRight: 5,
    color: themeColors.primary,
    textDecorationLine: 'underline',
    ...fontFamilyStyles.loraItalic,
  },
  extraInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  extraInfoText: {
    marginRight: 10,
    color: themeColors.grey,
  },
  extraInfoIcon: {
    marginRight: 5,
  },
  viewIcon: {
    marginTop: 2.5,
  },
});

export default ForumOverviewItem;

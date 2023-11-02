import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../../config';
import { themeColors, themeColorUtils } from '../styles/themeColors';
import { fontFamilyStyles } from '../styles/typography';
import { globalStyles } from '../styles/global';
import { isOnline } from '../utils/NetworkDetection';
import { getSingleImage } from '../utils/ImageCacher';

type ArticleOverviewItemProps = {
  title: string,
  image: string,
  onPress: () => void;
};

const ArticleOverviewItem: React.FC<ArticleOverviewItemProps> = ({ title, image, onPress }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [articleImage, setArticlemage] = useState<string>();

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  useEffect(() => {
    const fetchArticleImage = async () => {
      try {
        const localImage = await getSingleImage(image);
        const imageUrl = await isOnline() ? BASE_URL + '/uploads/articles/' + image : localImage;
        setArticlemage(imageUrl);
      } catch (error) {
        console.error('Error fetching article image:', error);
      }
    };

    fetchArticleImage();
  }, []);

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      style={[styles.articleOverviewItem, globalStyles.marginBottom, isPressed && styles.articleOverviewItemPressed]}
      onPress={onPress}
    >
      <Image testID="article-item-image" source={{ uri: articleImage }} style={styles.articleOverviewItemImage} />
      <Text style={[styles.articleOverviewItemTitle, isPressed && themeColorUtils.textColorPrimary]}>{title}</Text>

      <View style={styles.readLinkContainer}>
        <Text style={styles.readLinkText}>Read</Text>

        <FontAwesomeIcon icon={faChevronRight} color={themeColors.primary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  articleOverviewItem: {
    backgroundColor: themeColors.white,
    borderRadius: 5,
  },
  articleOverviewItemImage: {
    height: 120,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 5,
  },
  articleOverviewItemPressed: {
    backgroundColor: themeColors.primary + 25,
  },
  articleOverviewItemTitle: {
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
    ...fontFamilyStyles.loraItalic,
  },
});

export default ArticleOverviewItem;

import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { themeColors, themeColorUtils } from '../styles/themeColors';
import { fontFamilyStyles } from '../styles/typography';
import { globalStyles } from '../styles/global';

type ArticleOverviewItemProps = {
  title: string,
  onPress: () => void;
};

const ArticleOverviewItem: React.FC<ArticleOverviewItemProps> = ({ title, onPress }) => {
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
      style={[styles.articleOverviewItem, globalStyles.marginBottom, isPressed && styles.articleOverviewItemPressed]}
      onPress={onPress}
    >
      <Image source={require('../../assets/images/article-banner.jpg')} style={styles.articleOverviewItemImage} />
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  articleOverviewItemImage: {
    height: 80,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 5,
  },
  articleOverviewItemPressed: {
    backgroundColor: themeColors.primary + 25
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
    ...fontFamilyStyles.loraItalic
  }
});

export default ArticleOverviewItem;

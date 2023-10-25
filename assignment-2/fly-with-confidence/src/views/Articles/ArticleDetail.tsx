import type { Article } from '../../typings/Article';

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useRoute } from '@react-navigation/native';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { fontFamilyStyles } from '../../styles/typography';
import { themeColors } from '../../styles/themeColors';
import { globalStyles } from '../../styles/global';
import { TextTitle, CategoryLabel, Button } from '../../components';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ArticleController from '../../controllers/ArticleController';
import { getMockImage } from '../../helpers/getMockImage';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function ArticleDetail({ navigation }) {
  const route = useRoute();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const selectedArticleID = route.params && route.params.articleID;
  const [article, setArticle] = useState<Article | undefined>();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const article = await ArticleController.getArticle(selectedArticleID);
        setArticle(article);
      } catch (error) {
        console.error(`Error fetching article with id ${selectedArticleID}:`, error);
      }
    };

    fetchArticle();
  }, []);

  return article ? (
    <ScrollView style={globalStyles.pageContainer}>
      <TextTitle content={article.title}></TextTitle>

      <View style={styles.categoriesContainer}>
        <CategoryLabel
          text={article.category}
          labelColor='darkWhite'
          textColor='grey'
          customStyles={styles.categoryLabel}
        />
      </View>

      {article.image !== '' ? (
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.bookmarkButton}>
            <FontAwesomeIcon icon={faBookmark} color={themeColors.white} size={15} />
          </TouchableOpacity>

          <Image
            source={article.image ? getMockImage(article.image) : null}
            style={styles.articleOverviewItemImage}
          />
        </View>
      ) : null}

      <Text style={styles.articleDetailItemContent}>{article.content}</Text>

    </ScrollView>
  ) : 
  <View style={styles.noContentContainer}>
    <Text style={styles.noContentMessage}>
      The article you were looking for is currently unavailable
    </Text>
    <Button text={'Back to categories'} onPress={() => navigation.goBack()} />
  </View>
}

const styles = StyleSheet.create({
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  categoryLabel: {
    fontSize: 12,
    marginBottom: 5,
    marginRight: 10,
    marginTop: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  articleOverviewItemImage: {
    zIndex: -1,
    borderRadius: 5,
    height: 200,
    marginBottom: 10,
    resizeMode: 'cover',
    width: '100%',
  },
  bookmarkButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColors.lightGrey,
    zIndex: 2,
  },
  articleDetailItemContent: {
    color: themeColors.darkGrey,
    fontSize: 16,
    marginBottom: 13,
    ...fontFamilyStyles.montserratRegular,
  },
  noContentContainer: {
    marginTop: 20,
    padding: 25,
    borderRadius: 5,
    backgroundColor: themeColors.darkWhite,
  },
  noContentMessage: {
    marginBottom: 15,
    ...fontFamilyStyles.montserratRegular,
  },
});

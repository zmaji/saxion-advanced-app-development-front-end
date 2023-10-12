import type { Article } from '../../typings/Article';

import React, { useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView, 
  StyleSheet, 
  Text,
  View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { globalStyles } from '../../styles/global';
import { fontFamilyStyles } from '../../styles/typography';
import { themeColors } from "../../styles/themeColors";
import {
  TextTitle,
  TextSubTitle,
  ArticleOverviewItem,
  Button
} from '../../components';
import ArticleController from '../../controllers/ArticleController';

// @ts-ignore
export default function ArticleOverview({ navigation }) {
  const route = useRoute();
  // @ts-ignore
  const selectedCategory = route.params && route.params.selectedCategory;
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articles = await ArticleController.getArticles(selectedCategory);
        setArticles(articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <View style={globalStyles.pageContainer}>
      <TextTitle content={'Articles'} />

      <View style={[globalStyles.subTitleContainer, styles.textWrapper]}>
        <TextSubTitle content={'Popular articles in: '} color={'primary'} />

        <TextSubTitle content={`'${selectedCategory}'`} color={'primary'} customStyles={fontFamilyStyles.loraBoldItalic} />
      </View>

      <SafeAreaView style={[globalStyles.marginBottom, { height: '85%' }]}>
        {articles.length > 0 ? (
          <FlatList
            data={articles}
            renderItem={({ item }) => (
              <ArticleOverviewItem
                title={item.title}
                onPress={() => navigation.navigate('ArticleDetail', { articleID: item.articleID })}
              />
            )}
            keyExtractor={item => item.articleID}
          />
        ) : (
          <View style={styles.noContentContainer}>
            <Text style={styles.noContentMessage}>
              There are currently no articles available in category: {' '}

              <Text style={styles.noContentSelectedCategory}>
                {selectedCategory}
              </Text>
            </Text>
            <Button text={'Back to categories'} onPress={() => navigation.goBack()} />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  textWrapper: {
    flexWrap: 'wrap',
  },
  noContentContainer: {
    marginTop: 20,
    padding: 25,
    borderRadius: 5,
    backgroundColor: themeColors.darkWhite
  },
  noContentMessage: {
    marginBottom: 15,
    ...fontFamilyStyles.montserratRegular
  },
  noContentSelectedCategory: {
    ...fontFamilyStyles.montserratBold
  }
});
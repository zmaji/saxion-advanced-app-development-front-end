import type { Article } from '../../typings/Article';

import React, { useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView, StyleSheet,
  View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { globalStyles } from '../../styles/global';
import { fontFamilyStyles } from '../../styles/typography';
import { TextTitle, TextSubTitle, ArticleOverviewItem } from '../../components';
import PostController from '../../controllers/ArticleController';

// @ts-ignore
export default function ArticleOverview({ navigation }) {
  const route = useRoute();
  // @ts-ignore
  const selectedCategory = route.params && route.params.selectedCategory;
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articles = await PostController.getArticles();
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
        <FlatList
          data={articles}
          renderItem={({ item }) => <ArticleOverviewItem title={item.title} onPress={() => navigation.navigate('ArticleDetail', { articleID: item.articleID })} />}
          keyExtractor={item => item.articleID}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    flexWrap: 'wrap',
  },
});
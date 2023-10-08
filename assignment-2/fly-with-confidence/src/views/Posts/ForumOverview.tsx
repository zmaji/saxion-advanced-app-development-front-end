import React from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { globalStyles } from "../../styles/global";
import TextTitle from "../../components/typography/TextTitle";
import TextSubTitle from "../../components/typography/TextSubTitle";
import ForumOverviewItem from "../../components/ForumOverviewItem";
import { fontFamilyStyles } from "../../styles/typography";

// @ts-ignore
export default function ArticleOverview({ navigation }) {
  const route = useRoute();
  const selectedCategory = route.params && route.params.selectedCategory;

  const categories = [
    {
      id: '1',
      title: 'I did it!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque varius sem ut venenatis. Class aptent taciti sociosqu ad litora.',
      comments: 1,
      likes: 10,
      dislikes: 0,
      categories: ['Success', 'Advice'],
      image: '../../assets/images/article-banner.jpg',
      onPress: () => navigation.navigate('ForumDetail', { articleID: 1 })
    },
    {
      id: '2',
      title: 'Atlantis tropical storm',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque varius sem ut venenatis. Class aptent taciti sociosqu ad litora.',
      comments: 1,
      likes: 10,
      dislikes: 0,
      categories: ['Support'],
      image: '',
      onPress: () => navigation.navigate('ForumDetail', { articleID: 2 })
    },
    {
      id: '3',
      title: 'Fear of feeling trapped',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque varius sem ut venenatis. Class aptent taciti sociosqu ad litora.',
      comments: 1,
      likes: 10,
      dislikes: 0,
      categories: ['Support'],
      image: '../../assets/images/article-banner.jpg',
      onPress: () => navigation.navigate('ForumDetail', { articleID: 3 })
    },
    {
      id: '4',
      title: 'Fear of feeling trapped',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque varius sem ut venenatis. Class aptent taciti sociosqu ad litora.',
      comments: 1,
      likes: 10,
      dislikes: 0,
      categories: ['Support'],
      image: '',
      onPress: () => navigation.navigate('ForumDetail', { articleID: 4 })
    },
    {
      id: '5',
      title: 'Fear of feeling trapped',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque varius sem ut venenatis. Class aptent taciti sociosqu ad litora.',
      comments: 1,
      likes: 10,
      dislikes: 0,
      categories: ['Support'],
      image: '../../assets/images/article-banner.jpg',
      onPress: () => navigation.navigate('ForumDetail', { articleID: 5 })
    },
  ];

  return (
    <View style={globalStyles.pageContainer}>
      <TextTitle content={'Forum posts'} />

      <View style={globalStyles.subTitleContainer}>
        <TextSubTitle content={'Sorting posts on: '} color={'primary'} />

        <TextSubTitle content={`"${selectedCategory}"`} color={'primary'} customStyles={fontFamilyStyles.loraBoldItalic} />
      </View>

      <SafeAreaView style={globalStyles.marginBottom}>
        <FlatList
          data={categories}
          renderItem={({ item }) => <ForumOverviewItem
            title={item.title}
            content={item.content}
            comments={item.comments}
            likes={item.likes}
            dislikes={item.dislikes}
            image={item.image}
            categories={item.categories}
            onPress={item.onPress}
          />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </View>
  );
};
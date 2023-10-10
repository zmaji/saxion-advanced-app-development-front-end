import type { Comment } from '../../typings/Comment';

import React from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { globalStyles } from "../../styles/global";
import { fontFamilyStyles } from "../../styles/typography";
import { TextTitle, TextSubTitle, ForumOverviewItem } from "../../components";

// @ts-ignore
export default function ForumOverview({ navigation }) {
  const route = useRoute();
  // @ts-ignore
  const selectedCategory = route.params && route.params.selectedCategory;

  const forumPosts = [
    {
      postID: '1',
      user: '1',
      title: 'I did it!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque varius sem ut venenatis. Class aptent taciti sociosqu ad litora.',
      categories: ['Success', 'Advice'],
      likes: 10,
      dislikes: 0,
      image: 'article-banner.jpg',
      onPress: () => navigation.navigate('ForumDetail', { postID: '1' })
    },
    {
      postID: '2',
      user: '2',
      title: 'I did it!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque varius sem ut venenatis. Class aptent taciti sociosqu ad litora.',
      categories: ['Success', 'Advice'],
      likes: 10,
      dislikes: 0,
      image: 'article-banner.jpg',
      onPress: () => navigation.navigate('ForumDetail', { postID: '2' })
    },
    {
      postID: '3',
      user: '3',
      title: 'I did it!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque varius sem ut venenatis. Class aptent taciti sociosqu ad litora.',
      categories: ['Success', 'Advice'],
      likes: 10,
      dislikes: 0,
      image: 'article-banner.jpg',
      onPress: () => navigation.navigate('ForumDetail', { postID: '3' })
    },
    {
      postID: '4',
      user: '4',
      title: 'I did it!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque varius sem ut venenatis. Class aptent taciti sociosqu ad litora.',
      categories: ['Success', 'Advice'],
      likes: 10,
      dislikes: 0,
      image: 'article-banner.jpg',
      onPress: () => navigation.navigate('ForumDetail', { postID: '4' })
    },
    {
      postID: '5',
      user: '5',
      title: 'I did it!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque varius sem ut venenatis. Class aptent taciti sociosqu ad litora.',
      categories: ['Success', 'Advice'],
      likes: 10,
      dislikes: 0,
      image: 'article-banner.jpg',
      onPress: () => navigation.navigate('ForumDetail', { postID: '5' })
    },
  ];

  const comments: Comment[] = [
    {
      commentID: '1',
      user: '1',
      post: '1',
      content: 'So how did you feel during the trip? How did you relieve your stress?',
      date: '10-09-2023'
    },
    {
      commentID: '2',
      user: '2',
      post: '1',
      content: 'Very nerve wrecking at first, but after reading some of the mindfulness articles i started to calm down!',
      date: '10-09-2023'
    },
  ];

  const commentCount = (postId: string) => {
    const postIdInt = parseInt(postId, 10);
    return comments.filter((comment) => parseInt(comment.post, 10) === postIdInt).length;
  };

  return (
    <View>
      <View style={globalStyles.pageContainer}>
        <TextTitle content={'Forum posts'} />

        <View style={globalStyles.subTitleContainer}>
          <TextSubTitle content={'Sorting posts on: '} color={'primary'} />

          <TextSubTitle content={`"${selectedCategory}"`} color={'primary'} customStyles={fontFamilyStyles.loraBoldItalic} />
        </View>

        <SafeAreaView style={[globalStyles.marginBottom, { height: '85%' }]}>
          <FlatList
            data={forumPosts}
            renderItem={({ item }) => <ForumOverviewItem
              key={item.postID}
              title={item.title}
              content={item.content}
              comments={commentCount(item.postID)}
              likes={item.likes}
              dislikes={item.dislikes}
              image={item.image}
              categories={item.categories}
              onPress={item.onPress}
            />}
            keyExtractor={item => item.postID}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};
import type { SimplePost } from '../../typings/Post';

import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { globalStyles } from '../../styles/global';
import { fontFamilyStyles } from '../../styles/typography';
import { themeColors } from '../../styles/themeColors';
import {
  TextTitle,
  TextSubTitle,
  ForumOverviewItem,
  Button,
} from '../../components';
import PostController from '../../controllers/PostController';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function ForumOverview({ navigation }) {
  const [posts, setPosts] = useState<SimplePost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await PostController.getPosts();
        setPosts(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <View style={globalStyles.pageContainer}>
      <TextTitle content={'Forum posts'} />

      <View style={[globalStyles.subTitleContainer, styles.textWrapper]}>
        <TextSubTitle content={'Sorting posts on: '} color={'primary'} />

        <TextSubTitle content={`popularity`} color={'primary'} customStyles={fontFamilyStyles.loraBoldItalic} />
      </View>

      <SafeAreaView style={[globalStyles.marginBottom, { height: '85%' }]}>
        {posts.length > 0 ? (
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <ForumOverviewItem
                key={item.postID}
                title={item.title}
                content={item.content}
                comments={item.commentCount}
                likes={item.likes}
                dislikes={item.dislikes}
                image={item.image}
                categories={item.categories}
                onPress={() => navigation.navigate('ForumDetail', { postID: item.postID })}
              />
            )}
            keyExtractor={(item) => item.postID}
          />
        ) : (
          <View style={styles.noContentContainer}>
            <Text style={styles.noContentMessage}>
              There are currently no forum posts available
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
    backgroundColor: themeColors.darkWhite,
  },
  noContentMessage: {
    marginBottom: 15,
    ...fontFamilyStyles.montserratRegular,
  },
  noContentPosts: {
    ...fontFamilyStyles.montserratBold,
  },
});

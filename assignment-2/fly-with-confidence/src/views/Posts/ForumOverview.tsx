import type { SimplePost } from '../../typings/Post';

import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
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
import CreatePostModal from '../../components/modals/CreatePostModal';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function ForumOverview({ navigation }) {
  const token = useSelector((state: { token: { token: string } }) => state.token.token);

  const [posts, setPosts] = useState<SimplePost[]>([]);
  const [isCreatePostModalVisible, setCreatePostModalVisible] = React.useState(false);

  const fetchPosts = async () => {
    try {
      const newPosts: SimplePost[] = await PostController.getPosts();

      newPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setPosts(newPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openCreatePostModal = () => {
    setCreatePostModalVisible(true);
  };

  const closeCreatePostModal = () => {
    setCreatePostModalVisible(false);
  };

  return (
    <ScrollView style={globalStyles.pageContainer}>
      <TextTitle content={'Forum posts'} />

      <View style={[globalStyles.subTitleContainer, styles.textWrapper]}>
        <TextSubTitle content={'Sorting posts on: '} color={'primary'} />

        <TextSubTitle content={`popularity`} color={'primary'} customStyles={fontFamilyStyles.loraBoldItalic} />
      </View>

      {token ? (
        <View style={styles.container}>
          <Button text='Create post' onPress={openCreatePostModal} />
        </View>
      ) : null}

      <View>
        {posts.length > 0 ? (
          posts.map((post) => (
            <ForumOverviewItem
              key={post.postID}
              title={post.title}
              content={post.content}
              comments={post.commentCount}
              likes={post.likes}
              dislikes={post.dislikes}
              image={post.image ? post.image : ''}
              categories={post.categories}
              onPress={() => navigation.navigate('ForumDetail', { postID: post.postID })}
            />
          ))
        ) : (
          <View style={styles.noContentContainer}>
            <Text style={styles.noContentMessage}>
              There are currently no forum posts available
            </Text>
            <Button text={'Back to categories'} onPress={() => navigation.goBack()} />
          </View>
        )}
      </View>


      <CreatePostModal
        isVisible={isCreatePostModalVisible}
        closeCreatePostModal={closeCreatePostModal}
        onCreatePost={() => fetchPosts()}
      />
    </ScrollView>
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
  container: {
    alignItems: 'flex-start',
    marginBottom: 15,
    marginTop: 10,
  },
});

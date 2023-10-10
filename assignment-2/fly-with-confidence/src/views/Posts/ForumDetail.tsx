import type { Post } from '../../typings/Post';
import type { Comment } from '../../typings/Comment';
import type { User } from '../../typings/User';

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useRoute } from '@react-navigation/native';
import { faFaceSmile, faFaceFrown, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { fontFamilyStyles } from '../../styles/typography';
import { themeColors } from '../../styles/themeColors';
import { globalStyles } from '../../styles/global';
import { TextTitle, CategoryLabel, CommentPost } from '../../components';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const forumPosts: Post[] = [
  {
    postID: '1',
    user: '1',
    title: 'I did it!',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque varius sem ut venenatis. Class aptent taciti sociosqu ad litora.',
    categories: ['Success', 'Advice'],
    likes: 10,
    dislikes: 0,
    image: '../../../assets/images/article-banner.jpg',
  },
  {
    postID: '2',
    user: '2',
    title: 'I did it!',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque varius sem ut venenatis. Class aptent taciti sociosqu ad litora.',
    categories: ['Success'],
    likes: 10,
    dislikes: 0,
    image: '../../../assets/images/article-banner.jpg',
  },
  {
    postID: '3',
    user: '3',
    title: 'I did it!',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque varius sem ut venenatis. Class aptent taciti sociosqu ad litora.',
    categories: ['Success', 'Advice'],
    likes: 10,
    dislikes: 0,
    image: '../../../assets/images/article-banner.jpg',
  },
  {
    postID: '4',
    user: '4',
    title: 'I did it!',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque varius sem ut venenatis. Class aptent taciti sociosqu ad litora.',
    categories: ['Success'],
    likes: 10,
    dislikes: 0,
    image: '../../../assets/images/article-banner.jpg',
  },
  {
    postID: '4',
    user: '4',
    title: 'I did it!',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque varius sem ut venenatis. Class aptent taciti sociosqu ad litora.',
    categories: ['Advice'],
    likes: 10,
    dislikes: 0,
    image: '../../../assets/images/article-banner.jpg',
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

const users: User[] = [
  {
    userID: '1',
    userName: 'RealPilot',
    email: 'test@test.com',
    password: 'Password1',
    secret: 'Supersecret',
    roles: ['User, Admin']
  },
  {
    userID: '2',
    userName: 'zmaji',
    email: 'test1@test.com',
    password: 'Password2',
    secret: 'Supersecret2',
    roles: ['User, Admin']
  }
];

export default function ForumDetail() {
  const route = useRoute();
  // @ts-ignore
  const selectedPostID = route.params && route.params.postID;
  const selectedPost: Post | undefined = forumPosts.find(post => post.postID === selectedPostID);
  const selectedComments = comments.filter(comment => comment.post === selectedPostID);

  if (!selectedPost) {
    return (
      <View style={globalStyles.pageContainer}>
        <TextTitle content='No post found'></TextTitle>
      </View>
    );
  }

  const { title, content, likes, dislikes, categories, image } = selectedPost;

  return (
    <ScrollView style={globalStyles.pageContainer}>
      <TextTitle content={title}></TextTitle>

      <Text style={styles.userDetails}>Posted by zmaji at 09-10-2023</Text>

      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <CategoryLabel key={index} text={category} labelColor='darkWhite' textColor='grey' customStyles={styles.categoryLabel} />
        ))}
      </View>

      {image !== '' ? (
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.bookmarkButton}>
            <FontAwesomeIcon icon={faBookmark} color={themeColors.white} size={15} />
          </TouchableOpacity>

          <Image source={require(`../../../assets/images/article-banner.jpg`)} style={styles.forumOverviewItemImage} />
        </View>
      ) : null}

      <Text style={styles.forumDetailItemContent}>{content}</Text>

      <View style={styles.extraInfoContainer}>
        <FontAwesomeIcon style={styles.likesContainer} icon={faFaceSmile} color={themeColors.grey} />
        <Text style={styles.extraInfoText}>{likes}</Text>

        <FontAwesomeIcon style={styles.likesContainer} icon={faFaceFrown} color={themeColors.grey} />
        <Text style={styles.extraInfoText}>{dislikes}</Text>
      </View>

      {selectedComments.map((comment) => {
        const matchingUser = users.find((user) => user.userID === comment.user);
        const username = matchingUser ? matchingUser.userName : '';

        return (
          <CommentPost
            key={comment.commentID}
            content={comment.content}
            date={comment.date}
            username={username}
          />
        );
      })}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  userDetails: {
    color: themeColors.darkGrey,
    fontSize: 14,
    marginBottom: 7,
  },
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
  forumOverviewItemImage: {
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
  forumDetailItemContent: {
    color: themeColors.darkGrey,
    fontSize: 16,
    marginBottom: 13,
    ...fontFamilyStyles.montserratRegular,
  },
  extraInfoContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  likesContainer: {
    marginRight: 5,
  },
  extraInfoText: {
    marginRight: 10,
  }
});
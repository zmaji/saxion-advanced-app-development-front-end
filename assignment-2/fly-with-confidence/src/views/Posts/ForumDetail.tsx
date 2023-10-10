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
import CategoryLabel from '../../components/labels/CategoryLabel';
import Comment from '../../components/layout/Comment';
import { TextTitle } from '../../components';

const forumPosts = [
  {
    id: 1,
    title: 'I did it!',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque varius sem ut venenatis. Class aptent taciti sociosqu ad litora.',
    comments: 1,
    likes: 10,
    dislikes: 0,
    categories: ['Success', 'Advice'],
    image: require('../../../assets/images/article-banner.jpg'),
  },
  {
    id: 2,
    title: 'Atlantis tropical storm Atlantis tropical storm',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque varius sem ut venenatis. Class aptent taciti sociosqu ad litora.',
    comments: 1,
    likes: 10,
    dislikes: 0,
    categories: ['Support'],
    image: '',
  },
  {
    id: 3,
    title: 'Fear of feeling trapped',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque varius sem ut venenatis. Class aptent taciti sociosqu ad litora.',
    comments: 1,
    likes: 10,
    dislikes: 0,
    categories: ['Support'],
    image: require('../../../assets/images/article-banner.jpg'),
  },
  {
    id: 4,
    title: 'Fear of feeling trapped super large title, and even more text of a title',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque varius sem ut venenatis. Class aptent taciti sociosqu ad litora.',
    comments: 1,
    likes: 10,
    dislikes: 0,
    categories: ['Support'],
    image: '',
  },
  {
    id: 5,
    title: 'Fear of feeling trapped',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque varius sem ut venenatis. Class aptent taciti sociosqu ad litora.',
    comments: 1,
    likes: 10,
    dislikes: 0,
    categories: ['Support'],
    image: require('../../../assets/images/article-banner.jpg'),
  },
];

const comments = [
  {
    id: 1,
    user: 1,
    postID: 1,
    content: 'So how did you feel during the trip? How did you relieve your stress?',
    date: '10-09-2023'
  },
  {
    id: 2,
    user: 2,
    postID: 1,
    content: 'Very nerve wrecking at first, but after reading some of the mindfulness articles i started to calm down!',
    date: '10-09-2023'
  },
  {
    id: 3,
    user: 1,
    postID: 2,
    content: 'Wow good job!!',
    date: '10-09-2023'
  },
  {
    id: 4,
    user: 1,
    postID: 2,
    content: 'Wow good job!!',
    date: '10-09-2023'
  },
  {
    id: 5,
    user: 1,
    postID: 2,
    content: 'Wow good job!!',
    date: '10-09-2023'
  },
];

const users = [
  {
    id: 1,
    username: 'RealPilot'
  },
  {
    id: 2,
    username: 'zmaji'
  },

];

export default function ForumDetail() {
  const route = useRoute();
  // @ts-ignore
  const selectedPostID = route.params && route.params.postID;
  const selectedPost = forumPosts.find(post => post.id === selectedPostID);
  const selectedComments = comments.filter(comment => comment.postID === selectedPostID);

  if (!selectedPost) {
    return (
      <View style={globalStyles.pageContainer}>
        <TextTitle content='No post found'></TextTitle>
      </View>
    );
  }

  const { title, content, likes, dislikes, categories, image } = selectedPost;

  return (
    <View style={globalStyles.pageContainer}>
      <TextTitle content={title}></TextTitle>

      <Text style={styles.userDetails}>Posted by zmaji at 09-10-2023</Text>

      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <CategoryLabel key={index} text={category} labelColor='darkWhite' textColor='grey' customStyles={styles.categoryLabel} />
        ))}
      </View>

      {image !== '' ? (
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.forumOverviewItemImage} />
          <View style={styles.bookmarkButton}>
            <FontAwesomeIcon icon={faBookmark} color={themeColors.white} size={15} />
          </View>
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
        const matchingUser = users.find((user) => user.id === comment.user);
        const username = matchingUser ? matchingUser.username : '';

        return (
          <Comment
            key={comment.id}
            content={comment.content}
            date={comment.date}
            username={username}
          />
        );
      })}
    </View>
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
    borderRadius: 5,
    height: 200,
    marginBottom: 10,
    resizeMode: 'cover',
    width: '100%',
  },
  bookmarkButton: {
    alignItems: 'center',
    backgroundColor: themeColors.lightGrey,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    position: 'absolute',
    right: 15,
    top: 15,
    width: 40,
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
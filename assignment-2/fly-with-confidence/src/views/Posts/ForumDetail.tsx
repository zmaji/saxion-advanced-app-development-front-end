import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFaceSmile, faFaceFrown, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { useRoute } from '@react-navigation/native';
import { fontFamilyStyles } from '../../styles/typography';
import { themeColors } from '../../styles/themeColors';
import { globalStyles } from '../../styles/global';
import CategoryLabel from '../../components/labels/CategoryLabel';
import Comment from '../../components/layout/Comment';

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
  const selectedPostID = route.params && route.params.postID;
  const selectedPost = forumPosts.find(post => post.id === selectedPostID);
  const selectedComments = comments.filter(comment => comment.postID === selectedPostID);

  if (!selectedPost) {
    return (
      <Text>No post found</Text>
    );
  }

  const { title, content, likes, dislikes, categories, image } = selectedPost;

  return (
    <View style={globalStyles.pageContainer}>
      <Text style={styles.forumDetailItemTitle}>{title}</Text>

      <Text style={styles.userDetails}>Posted by zmaji at 09-10-2023</Text>

      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <CategoryLabel key={index} text={category} labelColor='darkWhite' textColor='grey' customStyles={styles.categoryLabel} />
        ))}
      </View>

      {image !== '' ? (
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.forumOverviewItemImage} />
          <View style={styles.circleContainer}>
            <FontAwesomeIcon icon={faBookmark} color={themeColors.white} size={15} />
          </View>
        </View>
      ) : null}

      <Text style={styles.forumDetailItemContent}>{content}</Text>

      <View style={styles.extraInfoContainer}>
        <FontAwesomeIcon style={styles.extraInfoIcon} icon={faFaceSmile} color={themeColors.grey} />
        <Text style={styles.extraInfoText}>{likes}</Text>

        <FontAwesomeIcon style={styles.extraInfoIcon} icon={faFaceFrown} color={themeColors.grey} />
        <Text style={styles.extraInfoText}>{dislikes}</Text>
      </View>

      <View style={styles.commentContainer}>
        {selectedComments.map((comment) => {
          const matchingUser = users.find((user) => user.id === comment.user);
          const username = matchingUser ? matchingUser.username : '';

          return (
            <Comment
              key={comment.id}
              content={comment.content}
              date={comment.date}
              commentColor={'darkWhite'}
              customStyles={styles.commentItem}
              username={username}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  forumOverviewItemImage: {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 10,
  },
  forumDetailItemTitle: {
    fontSize: 25,
    color: themeColors.darkGrey,
    marginBottom: 7,
    ...fontFamilyStyles.montserratSemiBold,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  categoryLabel: {
    marginRight: 10,
    marginBottom: 5,
    marginTop: 4,
    fontSize: 12,
  },
  forumDetailItemContent: {
    fontSize: 16,
    color: themeColors.darkGrey,
    marginBottom: 13,
    ...fontFamilyStyles.montserratRegular,
  },
  extraInfoContainer: {
    flexDirection: 'row',
    marginBottom: 30
  },
  extraInfoText: {
    marginRight: 10,
  },
  extraInfoIcon: {
    marginRight: 5,
  },
  userDetails: {
    color: themeColors.darkGrey,
    fontSize: 14,
    marginBottom: 7,
  },
  circleContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 40,
    height: 40,
    backgroundColor: themeColors.lightGrey,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  commentContainer: {
  },
  commentItem: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 5,
  }
});
import type { PostDetail } from '../../typings/Post';

import React, { useEffect, useState } from 'react';
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
import PostController from '../../controllers/PostController';

export default function ForumDetail() {
  const route = useRoute();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const selectedPostID = route.params && route.params.postID;
  const [post, setPost] = useState<PostDetail | undefined>();
  const [date, setDate] = useState('');

  const removeTimeStamp = (timestamp: string) => {
    try {
      const datePart = timestamp.split('T')[0];
      return datePart;
    } catch (error) {
      console.error('Error removing timestamp:', error);
      return '';
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await PostController.getPost(selectedPostID);

        if (post) {
          setPost(post);
          const dateWithoutTimeStamp = removeTimeStamp(post.date);
          setDate(dateWithoutTimeStamp);
        }
      } catch (error) {
        console.error(`Error fetching post with id ${selectedPostID}:`, error);
      }
    };

    fetchPost();
  }, []);

  return post ? (
    <ScrollView style={globalStyles.pageContainer}>
      <TextTitle content={post.title}></TextTitle>

      <Text style={styles.userDetails}>Posted by {post.user} at {date}</Text>

      <View style={styles.categoriesContainer}>
        {post.categories.map((category, index) => (
          <CategoryLabel
            key={index}
            text={category}
            labelColor='darkWhite'
            textColor='grey'
            customStyles={styles.categoryLabel}
          />
        ))}
      </View>

      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.bookmarkButton}>
          <FontAwesomeIcon icon={faBookmark} color={themeColors.white} size={15} />
        </TouchableOpacity>

        {post.image !== 'mock' && post.image !== '' ? (
          <Image source={{ uri: post.image }} style={styles.forumOverviewItemImage} />
        ) : (
          <Image source={require('../../../assets/images/article-banner.jpg')} style={styles.forumOverviewItemImage} />
        )}
      </View>

      <Text style={styles.forumDetailItemContent}>{post.content}</Text>

      <View style={styles.extraInfoContainer}>
        <FontAwesomeIcon style={styles.likesContainer} icon={faFaceSmile} color={themeColors.grey} />
        <Text style={styles.extraInfoText}>{post.likes}</Text>

        <FontAwesomeIcon style={styles.likesContainer} icon={faFaceFrown} color={themeColors.grey} />
        <Text style={styles.extraInfoText}>{post.dislikes}</Text>
      </View>

      {post.comments.map((comment) => {
        return (
          <CommentPost
            key={comment.commentID}
            content={comment.content}
            date={comment.date}
            username={comment.user}
          />
        );
      })}
    </ScrollView>
  ) : null;
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
  },
});

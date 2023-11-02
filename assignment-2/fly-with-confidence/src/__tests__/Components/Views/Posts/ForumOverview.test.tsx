import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ForumOverview from '../../../../views/Posts/ForumOverview';
import { Provider } from 'react-redux';
import tokenStore from '../../../../stores/tokenStore';

jest.mock('../../../../controllers/PostController', () => ({
  getPosts: jest.fn(),
}));

const mockPosts = [
  {
    postID: 1,
    title: 'Mock Post Title 1',
    content: 'Mock post content 1',
    commentCount: '5',
    likes: '10',
    dislikes: '2',
    image: 'forum-post-1',
    categories: ['Category 1'],
  },
  {
    postID: 2,
    title: 'Mock Post Title 2',
    content: 'Mock post content 2',
    commentCount: '3',
    likes: '7',
    dislikes: '1',
    image: 'forum-post-2',
    categories: ['Category 2'],
  },
];

test('should render forum overview with mock data', async () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('../../../../controllers/PostController').getPosts.mockResolvedValue(mockPosts);

  const Stack = createStackNavigator();

  const { getByText, getAllByTestId } = render(
    <Provider store={tokenStore}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ForumOverview">
            {() => <ForumOverview navigation={undefined} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>,
  );

  await waitFor(() => {
    const titleElement1 = getByText(mockPosts[0].title);
    const titleElement2 = getByText(mockPosts[1].title);

    const contentElement1 = getByText(mockPosts[0].content);
    const contentElement2 = getByText(mockPosts[1].content);

    const commentCountElement1 = getByText(mockPosts[0].commentCount);
    const commentCountElement2 = getByText(mockPosts[1].commentCount);

    const likesElement1 = getByText(mockPosts[0].likes);
    const likesElement2 = getByText(mockPosts[1].likes);

    const dislikesElement1 = getByText(mockPosts[0].dislikes);
    const dislikesElement2 = getByText(mockPosts[1].dislikes);

    const imageElements = getAllByTestId('forum-item-image');
    const forumImage1 = imageElements[0];
    const forumImage2 = imageElements[1];

    expect(titleElement1).toBeTruthy();
    expect(titleElement2).toBeTruthy();
    expect(contentElement1).toBeTruthy();
    expect(contentElement2).toBeTruthy();
    expect(commentCountElement1).toBeTruthy();
    expect(commentCountElement2).toBeTruthy();
    expect(likesElement1).toBeTruthy();
    expect(likesElement2).toBeTruthy();
    expect(dislikesElement1).toBeTruthy();
    expect(dislikesElement2).toBeTruthy();
    expect(forumImage1).toBeTruthy();
    expect(forumImage2).toBeTruthy();

    expect(titleElement1.props.children).toBe(mockPosts[0].title);
    expect(titleElement2.props.children).toBe(mockPosts[1].title);
    expect(contentElement1.props.children).toBe(mockPosts[0].content);
    expect(contentElement2.props.children).toBe(mockPosts[1].content);
    expect(commentCountElement1.props.children).toBe(mockPosts[0].commentCount);
    expect(commentCountElement2.props.children).toBe(mockPosts[1].commentCount);
    expect(likesElement1.props.children).toBe(mockPosts[0].likes);
    expect(likesElement2.props.children).toBe(mockPosts[1].likes);
    expect(dislikesElement1.props.children).toBe(mockPosts[0].dislikes);
    expect(dislikesElement2.props.children).toBe(mockPosts[1].dislikes);
    expect(forumImage1.props.source.uri).toContain(mockPosts[0].image);
    expect(forumImage2.props.source.uri).toContain(mockPosts[1].image);
  });
});

test('should render forum overview with no data message', async () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('../../../../controllers/PostController').getPosts.mockResolvedValue([]);

  const Stack = createStackNavigator();

  const { getByText } = render(
    <Provider store={tokenStore}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ForumOverview">
            {() => <ForumOverview navigation={undefined} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>,
  );

  await waitFor(() => {
    const errorMessage = 'There are currently no forum posts available';
    const noDataElement = getByText(errorMessage);
    expect(noDataElement).toBeTruthy();
    expect(noDataElement.props.children).toBe(errorMessage);
  });
});

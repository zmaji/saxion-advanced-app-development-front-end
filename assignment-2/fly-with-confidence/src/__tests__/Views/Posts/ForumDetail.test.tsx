import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ForumDetail from '../../../views/Posts/ForumDetail';

jest.mock('../../../../controllers/PostController', () => ({
  getPost: jest.fn(),
}));

const mockPost = {
  title: 'Mock Post Title',
  user: 'Mock User',
  date: '2023-11-01T10:00:00Z',
  categories: ['Category1', 'Category2'],
  image: 'forum-post-1',
  location: 'Mock Location',
  content: 'Mock post content.',
  likes: '10',
  dislikes: '2',
  comments: [
    {
      commentID: 1,
      content: 'Mock Comment 1',
      date: '2023-11-01T11:00:00Z',
      user: 'User1',
    },
    {
      commentID: 2,
      content: 'Mock Comment 2',
      date: '2023-11-01T12:00:00Z',
      user: 'User2',
    },
  ],
};

test('should render forum detail with mock data', async () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('../../../../controllers/PostController').getPost.mockResolvedValue(mockPost);

  const Stack = createStackNavigator();

  const { getByText, getByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ForumDetail">
            {() => <ForumDetail navigation={undefined} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>,
  );

  await waitFor(() => {
    const titleElement = getByText(mockPost.title);
    const userElement = getByText(`Posted by ${mockPost.user} at 2023-11-01`);
    const categoriesElement1 = getByText(mockPost.categories[0]);
    const categoriesElement2 = getByText(mockPost.categories[1]);
    const imageElement = getByTestId('forum-image');
    const locationElement = getByText(mockPost.location);
    const contentElement = getByText(mockPost.content);
    const likesElement = getByText(mockPost.likes);
    const dislikesElement = getByText(mockPost.dislikes);
    const comment1Element = getByText(mockPost.comments[0].content);
    const comment2Element = getByText(mockPost.comments[1].content);

    expect(titleElement).toBeTruthy();
    expect(userElement).toBeTruthy();
    expect(categoriesElement1).toBeTruthy();
    expect(categoriesElement2).toBeTruthy();
    expect(imageElement).toBeTruthy();
    expect(locationElement).toBeTruthy();
    expect(contentElement).toBeTruthy();
    expect(likesElement).toBeTruthy();
    expect(dislikesElement).toBeTruthy();
    expect(comment1Element).toBeTruthy();
    expect(comment2Element).toBeTruthy();

    expect(titleElement.props.children).toBe(mockPost.title);
    expect(userElement.props.children.join('')).toBe(`Posted by ${mockPost.user} at 2023-11-01`);
    expect(categoriesElement1.props.children).toBe(mockPost.categories[0]);
    expect(categoriesElement2.props.children).toBe(mockPost.categories[1]);
    expect(imageElement.props.source.uri).toContain(mockPost.image);
    expect(locationElement.props.children).toBe(mockPost.location);
    expect(contentElement.props.children).toBe(mockPost.content);
    expect(likesElement.props.children).toBe(mockPost.likes);
    expect(dislikesElement.props.children).toBe(mockPost.dislikes);
    expect(comment1Element.props.children).toBe(mockPost.comments[0].content);
    expect(comment2Element.props.children).toBe(mockPost.comments[1].content);
  });
});

test('should render forum detail with no data message', async () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('../../../../controllers/PostController').getPost.mockResolvedValue(null);

  const Stack = createStackNavigator();

  const { getByText } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ForumDetail">
            {() => <ForumDetail navigation={undefined} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>,
  );

  await waitFor(() => {
    const errorMessage = 'The forum post you were looking for is currently unavailable';
    const noPostElement = getByText(errorMessage);
    expect(noPostElement).toBeTruthy();
  });
});

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ArticleDetail from '../../../views/Articles/ArticleDetail';

jest.mock('../../../controllers/ArticleController', () => ({
  getArticle: jest.fn(),
}));

const mockArticle = {
  title: 'Mock Article Title',
  category: 'Mock Category',
  image: 'education-and-information-1',
  content: 'Mock article content.',
};

test('should render article detail with mock data', async () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('../../../controllers/ArticleControllers').getArticle.mockResolvedValue(mockArticle);

  const Stack = createStackNavigator();

  const { getByText, getByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ArticleDetail">
            {() => <ArticleDetail navigation={undefined} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>,
  );

  await waitFor(() => {
    const titleElement = getByText(mockArticle.title);
    const categoryElement = getByText(mockArticle.category);
    const contentElement = getByText(mockArticle.content);
    const imageElement = getByTestId('article-image');

    expect(titleElement).toBeTruthy();
    expect(categoryElement).toBeTruthy();
    expect(contentElement).toBeTruthy();
    expect(imageElement).toBeTruthy();

    expect(categoryElement.props.children).toBe(mockArticle.category);
    expect(titleElement.props.children).toBe(mockArticle.title);
    expect(contentElement.props.children).toBe(mockArticle.content);
    expect(imageElement.props.source.uri).toContain(mockArticle.image);
  });
});

test('should render article detail with no data message', async () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('../../../controllers/ArticleController').getArticle.mockResolvedValue(null);

  const Stack = createStackNavigator();

  const { getByText } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ArticleDetail">
            {() => <ArticleDetail navigation={undefined} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>,
  );

  await waitFor(() => {
    const errorMessage = 'The article you were looking for is currently unavailable';
    const noArticleElement = getByText(errorMessage);
    expect(noArticleElement).toBeTruthy();
    expect(noArticleElement.props.children).toBe(errorMessage);
  });
});

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ArticleOverview from '../../../../views/Articles/ArticleOverview';

jest.mock('../../../../controllers/ArticleController', () => ({
  getArticles: jest.fn(),
}));

const mockArticles = [
  {
    articleID: 1,
    title: 'Mock Article Title 1',
    image: 'education-and-information-1',
  },
  {
    articleID: 2,
    title: 'Mock Article Title 2',
    image: 'education-and-information-1',
  },
];

test('renders article overview with mock data', async () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('../../../../controllers/ArticleController').getArticles.mockResolvedValue(mockArticles);

  const Stack = createStackNavigator();

  const { getByText, getAllByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ArticleOverview">
            {() => <ArticleOverview navigation={undefined} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>,
  );

  await waitFor(() => {
    const titleElement1 = getByText(mockArticles[0].title);
    const titleElement2 = getByText(mockArticles[1].title);
    const imageElements = getAllByTestId('article-item-image');
    const articleImage1 = imageElements[0];
    const articleImage2 = imageElements[1];

    expect(titleElement1).toBeTruthy();
    expect(titleElement2).toBeTruthy();
    expect(articleImage1).toBeTruthy();
    expect(articleImage2).toBeTruthy();

    expect(titleElement1.props.children).toBe(mockArticles[0].title);
    expect(titleElement2.props.children).toBe(mockArticles[1].title);
    expect(articleImage1.props.source).toBe(1);
    expect(articleImage2.props.source).toBe(1);
  });
});

test('renders article overview with no data message', async () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('../../../../controllers/ArticleController').getArticles.mockResolvedValue([]);

  const Stack = createStackNavigator();

  const { getByText } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ArticleOverview">
            {() => <ArticleOverview navigation={undefined} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>,
  );

  await waitFor(() => {
    const errorMessage = 'There are currently no articles available in category: ';
    const noDataElement = getByText(errorMessage);
    expect(noDataElement).toBeTruthy();
    expect(noDataElement.props.children[0]).toBe(errorMessage);
  });
});

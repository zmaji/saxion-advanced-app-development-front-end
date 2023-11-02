import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ArticleOverviewItem from '../../../components/ArticleOverviewItem';

describe('ArticleOverviewItem', () => {
  it('should render the article item with the provided title, and image', async () => {
    const title = 'Test Article';
    const image = 'education-and-information-1';
    const onPress = jest.fn();

    const { getByTestId, getByText } = render(
      <ArticleOverviewItem title={title} image={image} onPress={onPress} />,
    );

    const itemElement = getByText(title);
    const imageElement = getByTestId('article-item-image');

    expect(itemElement).toBeTruthy();
    expect(imageElement).toBeTruthy();
    expect(itemElement.props.children).toBe(title);
    expect(imageElement.props.source.uri).toContain(image);
  });

  it('should call the onPress function when pressed', () => {
    const title = 'Test Article';
    const image = 'test.jpg';
    const onPress = jest.fn();

    const { getByText } = render(
      <ArticleOverviewItem title={title} image={image} onPress={onPress} />,
    );

    const itemElement = getByText(title);
    fireEvent.press(itemElement);

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ForumOverviewItem from '../../../components/ForumOverviewItem';

describe('ForumOverviewItem', () => {
  it('should render the forum item with the provided title, image, content, and onPress', async () => {
    const title = 'Test Forum';
    const image = 'forum-post-1';
    const content = 'This is a test forum content';
    const onPress = jest.fn();

    const { getByTestId, getByText } = render(
        <ForumOverviewItem
          title={title}
          image={image}
          content={content}
          comments={3}
          likes={5}
          dislikes={2}
          categories={['Category 1', 'Category 2']}
          onPress={onPress}
        />,
    );

    const titleElement = getByText(title);
    const imageElement = getByTestId('forum-item-image');
    const contentElement = getByText(content);
    const commentsElement = getByText('3');
    const likesElement = getByText('5');
    const dislikesElement = getByText('2');

    expect(titleElement).toBeTruthy();
    expect(imageElement).toBeTruthy();
    expect(contentElement).toBeTruthy();
    expect(commentsElement).toBeTruthy();
    expect(likesElement).toBeTruthy();
    expect(dislikesElement).toBeTruthy();

    expect(titleElement.props.children).toBe(title);
    expect(imageElement.props.source).toBe(1);
    expect(contentElement.props.children).toBe(content);
    expect(commentsElement.props.children).toBe(3);
    expect(likesElement.props.children).toBe(5);
    expect(dislikesElement.props.children).toBe(2);

    fireEvent.press(titleElement);
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

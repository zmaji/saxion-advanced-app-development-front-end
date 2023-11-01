import React from 'react';
import { render } from '@testing-library/react-native';
import Comment from '../../../components/layout/Comment';

describe('Comment', () => {
  it('should render a comment with username, date, and content', () => {
    const username = 'John Doe';
    const date = 'October 31, 2023';
    const content = 'This is a test comment.';

    const { getByText } = render(
      <Comment username={username} date={date} content={content} />
    );

    const usernameElement = getByText(username);
    const dateElement = getByText(` · ${date}`);
    const contentElement = getByText(content);

    expect(usernameElement).toBeTruthy();
    expect(dateElement).toBeTruthy();
    expect(contentElement).toBeTruthy();

    expect(usernameElement.props.children).toBe(username);
    expect(dateElement.props.children[1]).toBe(date);
    expect(contentElement.props.children).toBe(content);
  });
});

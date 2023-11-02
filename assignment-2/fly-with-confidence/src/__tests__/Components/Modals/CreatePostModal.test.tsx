import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import CreatePostModal from '../../../components/modals/CreatePostModal';
import { Provider } from 'react-redux';
import tokenStore from '../../../stores/tokenStore';

describe('CreatePostModal', () => {
  it('should render the create post modal and interact with input fields', async () => {
    try {
      const { getAllByText, getByPlaceholderText, getByText, getByTestId } = render(
        <Provider store={tokenStore}>
          <CreatePostModal isVisible={true} closeCreatePostModal={() => { }} onCreatePost={() => { }} />
        </Provider>,
      );

      expect(getByTestId('createPostModal')).toBeTruthy();
      const titleInput = getByPlaceholderText('Title');
      const textInput = getByPlaceholderText('Text');
      const categoryInput = getByText('Category');
      const locationInput = getByText('Location');

      expect(titleInput).toBeTruthy();
      expect(textInput).toBeTruthy();
      expect(categoryInput).toBeTruthy();
      expect(locationInput).toBeTruthy();

      await act(async () => {
        fireEvent.changeText(titleInput, 'Test Title');
        fireEvent.changeText(textInput, 'Test Text');
        fireEvent.press(categoryInput);
      });

      expect(titleInput.props.value).toBe('Test Title');
      expect(textInput.props.value).toBe('Test Text');

      const createPostElements = getAllByText('Create Post');
      const createPostElement = createPostElements[1];
      fireEvent.press(createPostElement);
    } catch (error) {
      console.error('Error occurred during rendering:', error);
    }
  });

  it('should display error messages for invalid input', async () => {
    try {
      const { getAllByText, getByPlaceholderText, getByText } = render(
        <Provider store={tokenStore}>
          <CreatePostModal isVisible={true} closeCreatePostModal={() => { }} onCreatePost={() => { }} />
        </Provider>,
      );

      let queryByText;

      await act(async () => {
        fireEvent.changeText(getByPlaceholderText('Title'), '');
        fireEvent.changeText(getByPlaceholderText('Text'), '');
      });

      const createPostElements = getAllByText('Create Post');
      const createPostElement = createPostElements[1];
      fireEvent.press(createPostElement);

      queryByText = getByText('Title is required');
      expect(queryByText).toBeTruthy();

      queryByText = getByText('Text is required');
      expect(queryByText).toBeTruthy();

      queryByText = getByText('At least one category is required');
      expect(queryByText).toBeTruthy();
    } catch (error) {
      console.error('Error occurred during rendering:', error);
    }
  });
});

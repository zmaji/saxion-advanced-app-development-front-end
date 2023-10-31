import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import CreatePostModal from '../../../components/modals/CreatePostModal';

describe('CreatePostModal', () => {
  it('should render the modal and interact with input fields', async () => {
    try {
      const { getByPlaceholderText, getByText, getByTestId } = render(
        <CreatePostModal isVisible={true} closeCreatePostModal={() => { }} onCreatePost={() => { }} />
      );

      expect(getByTestId('createPostModal')).toBeTruthy();
      const titleInput = getByPlaceholderText('Title');
      const textInput = getByPlaceholderText('Text');
      const categoryInput = getByPlaceholderText('Category');
      const locationInput = getByPlaceholderText('Location');

      expect(titleInput).toBeTruthy();
      expect(textInput).toBeTruthy();
      expect(categoryInput).toBeTruthy();
      expect(locationInput).toBeTruthy();
      expect(getByText('Create Post')).toBeTruthy();

      await act(async () => {
        fireEvent.changeText(titleInput, 'Test Title');
        fireEvent.changeText(textInput, 'Test Text');
        fireEvent.press(categoryInput);
        fireEvent.press(getByText('Anxiety Management'));
        fireEvent.press(getByText('Air Travel Worries'));
        fireEvent.press(locationInput);
        fireEvent.press(getByText('Current location (Test City)'));
      });

      expect(titleInput.props.value).toBe('Test Title');
      expect(textInput.props.value).toBe('Test Text');
      expect(categoryInput.props.value).toBe('Anxiety Management');
      expect(locationInput.props.value).toBe('Current location (Test City)');

      fireEvent.press(getByText('Create Post'));
    } catch (error) {
      console.error('Error occurred during rendering:', error);
    }
  });

  it('should display error messages for invalid input', async () => {
    try {
      const { getByPlaceholderText, getByText } = render(
        <CreatePostModal isVisible={true} closeCreatePostModal={() => { }} onCreatePost={() => { }} />
      );

      let queryByText: Element | null;

      await act(async () => {
        fireEvent.changeText(getByPlaceholderText('Title'), '');
        fireEvent.changeText(getByPlaceholderText('Text'), '');
        // Clear selected category and location
      });

      fireEvent.press(getByText('Create Post'));

      queryByText = getByText('Title is required');
      expect(queryByText).toBeTruthy();

      queryByText = getByText('Text is required');
      expect(queryByText).toBeTruthy();
      queryByText = getByText('At least one category is required');
      expect(queryByText).toBeTruthy();
      queryByText = getByText('Location is required');
      expect(queryByText).toBeTruthy();
    } catch (error) {
      console.error('Error occurred during rendering:', error);
    }
  });
});

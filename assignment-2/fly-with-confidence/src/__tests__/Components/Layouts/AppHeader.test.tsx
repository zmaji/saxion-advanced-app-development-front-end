import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AppHeader from '../../../components/layout/AppHeader'

describe('AppHeader', () => {
  it('should render the header with a back button and side panel button', () => {
    const mockBackPress = jest.fn();
    const mockSidePanelPress = jest.fn();

    const { getByText, getByTestId } = render(
      <AppHeader onSidePanelPress={mockSidePanelPress} />
    );

    const backButton = getByText('Back');
    const sidePanelButton = getByTestId('side-panel-button');

    expect(backButton).toBeTruthy();
    expect(sidePanelButton).toBeTruthy();

    fireEvent.press(backButton);
    fireEvent.press(sidePanelButton);

    expect(mockBackPress).toHaveBeenCalled();
    expect(mockSidePanelPress).toHaveBeenCalled();
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppHeader from '../../../components/layout/AppHeader';

describe('AppHeader', () => {
  it('should render the header with a side panel button', () => {
    const mockSidePanelPress = jest.fn();

    const { getByTestId } = render(
      <NavigationContainer>
        <AppHeader onSidePanelPress={mockSidePanelPress} />
      </NavigationContainer>
    );

    const sidePanelButton = getByTestId('side-panel-button');

    expect(sidePanelButton).toBeTruthy();

    fireEvent.press(sidePanelButton);
    expect(mockSidePanelPress).toHaveBeenCalled();
  });
});

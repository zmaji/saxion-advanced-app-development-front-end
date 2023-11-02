import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SelectionItem from '../../../components/SelectionItem';

describe('SelectionItem', () => {
  it('should render the selection item with the provided title, and title', async () => {
    const title = 'Test Selection';
    const icon = 'newspaper';
    const onPress = jest.fn();

    const { getByText, getByTestId } = render(
      <SelectionItem title={title} icon={icon} onPress={onPress} />,
    );

    const titleElement = getByText(title);
    const itemIconContainer = getByTestId('selection-item-icon-container');
    const containerChildren = itemIconContainer.children;
    const iconElement = containerChildren[0];
    const iconName = iconElement.props.icon.iconName;

    expect(titleElement).toBeTruthy();
    expect(iconElement).toBeTruthy();

    expect(titleElement.props.children).toContain(title);
    expect(iconName).toBe('newspaper');

    fireEvent.press(titleElement);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should invoke the onPress function when pressed', () => {
    const title = 'Test Selection';
    const icon = 'newspaper';
    const onPress = jest.fn();

    const { getByText } = render(
      <SelectionItem title={title} icon={icon} onPress={onPress} />,
    );

    const titleElement = getByText(title);

    fireEvent.press(titleElement);
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

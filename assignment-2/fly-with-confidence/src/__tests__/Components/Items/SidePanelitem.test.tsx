import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SidePanelItem from '../../../components/layout/SidePanelItem';

describe('SidePanelItem', () => {
  it('should render a side panel item with the provided title and icon', () => {
    const title = 'Item Title';
    const icon = 'newspaper';
    const onPress = jest.fn();

    const { getByText, getByTestId } = render(
      <SidePanelItem title={title} icon={icon} onPress={onPress} />
    );

    const titleElement = getByText(title);
    const itemIconContainer = getByTestId('sidepanel-item-icon-container');
    const containerChildren = itemIconContainer.children;
    const iconElement = containerChildren[0];
    const iconName = iconElement.props.icon.iconName;

    expect(titleElement).toBeTruthy();
    expect(iconElement).toBeTruthy();

    expect(titleElement.props.children).toContain(title);
    expect(iconName).toBe('newspaper');
  });

  it('should call the onPress function when pressed', () => {
    const title = 'Item Title';
    const icon = 'newspaper';
    const onPress = jest.fn();

    const { getByText } = render(
      <SidePanelItem title={title} icon={icon} onPress={onPress} />
    );

    const titleElement = getByText(title);
    fireEvent.press(titleElement);

    expect(onPress).toHaveBeenCalled();
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SelectionScreen from '../../../views/SelectionScreen';

test('renders SelectionScreen component', () => {
  const navigationOptions = [
    {
      id: '1',
      title: 'Articles',
      icon: 'newspaper',
      onPress: jest.fn(),
    },
    {
      id: '2',
      title: 'Education and information',
      icon: 'graduation-cap',
      onPress: jest.fn(),
    }
  ];

  const navigationMock = {
    navigate: jest.fn(),
  };

  const { getByText } = render(
    <SelectionScreen
      navigation={navigationMock}
    />
  );

  const mainTitle = getByText('How can we help you?');
  const subTitle = getByText('Select one option');

  expect(mainTitle).toBeTruthy();
  expect(subTitle).toBeTruthy();

  expect(mainTitle).toBe(mainTitle)
  expect(subTitle).toBe(subTitle)

  navigationOptions.forEach((item) => {
    const titleElement = getByText(item.title);

    expect(titleElement).toBeTruthy();
    expect(titleElement.props.children[1]).toBe(item.title);
  });
});

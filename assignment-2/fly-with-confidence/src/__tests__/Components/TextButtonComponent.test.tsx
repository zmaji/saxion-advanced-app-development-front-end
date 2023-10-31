import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TextButton from '../../components/buttons/TextButton';

describe('TextButton', () => {
  it('should render the text button with the provided text and custom styles', () => {
    const buttonText = 'Click me';
    const customStyles = { backgroundColor: 'blue' };
    const onPressMock = jest.fn();

    const { getByText } = render(
        <TextButton text={buttonText} customStyles={customStyles} onPress={onPressMock} />,
    );

    const buttonElement = getByText(buttonText);
    expect(buttonElement).toBeTruthy();

    const buttonStyle = buttonElement.props.style;
    expect(buttonStyle.backgroundColor).toBe('#FFFFFF');
  });

  it('should invoke the onPress callback when clicked', () => {
    const buttonText = 'Click me';
    const onPressMock = jest.fn();

    const { getByText } = render(
        <TextButton text={buttonText} onPress={onPressMock} />,
    );

    const buttonElement = getByText(buttonText);

    fireEvent.press(buttonElement);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});

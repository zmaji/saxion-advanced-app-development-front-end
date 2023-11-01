import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TextButton from '../../../components/buttons/TextButton';

describe('TextButton', () => {
  it('should render the text button with the provided text and default styles', () => {
    const buttonText = 'Click me';
    const onPressMock = jest.fn();

    const { getByText } = render(
        <TextButton text={buttonText} onPress={onPressMock} />,
    );

    const buttonElement = getByText(buttonText);
    const buttonStyle = buttonElement.props.style;

    expect(buttonElement).toBeTruthy();
    expect(buttonStyle).toBeTruthy();

    expect(buttonElement.props.children).toBe(buttonText);
    expect(buttonStyle.backgroundColor).toBe('#FFFFFF');
    expect(buttonStyle.color).toBe('#666666');
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

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../components/buttons/Button';

describe('Button', () => {
  it('should render the button with the provided text, buttonColor, and textColor', () => {
    const buttonText = 'Click me';
    const buttonColor = 'white';
    const textColor = 'grey';
    const onPressMock = jest.fn();

    const { getByText } = render(
      <Button text={buttonText} buttonColor={buttonColor} textColor={textColor} onPress={onPressMock} />
    );

    const buttonElement = getByText(buttonText);
    expect(buttonElement).toBeTruthy();

    const buttonStyle = buttonElement.props.style;
    expect(buttonStyle[0].color).toBe(buttonColor);
    expect(buttonStyle[1].color).toBe('#666666');
  });

  it('should invoke the onPress callback when clicked', () => {
    const buttonText = 'Click me';
    const onPressMock = jest.fn();

    const { getByText } = render(
      <Button text={buttonText} onPress={onPressMock} />
    );

    const buttonElement = getByText(buttonText);

    fireEvent.press(buttonElement);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});

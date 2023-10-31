import React from 'react';
import { render } from '@testing-library/react-native';
import InputError from '../../../components/error/InputError';

describe('InputError', () => {
  it('should render the error message with the provided content, color, and custom styles', () => {
    const errorMessage = 'This is an error message';
    const color = 'error';
    const customStyles = { fontSize: 16, fontWeight: 'bold' };

    const { getByText } = render(
      <InputError content={errorMessage} color={color} customStyles={customStyles} />,
    );

    const errorElement = getByText(errorMessage);
    expect(errorElement).toBeTruthy();

    const errorStyle = errorElement.props.style;
    expect(errorStyle[1].color).toBe('#CC3333');
    expect(errorStyle[2].fontSize).toBe(16);
    expect(errorStyle[2].fontWeight).toBe('bold');
  });

  it('should render the error message with default styles', () => {
    const errorMessage = 'This is an error message';

    const { getByText } = render(
      <InputError content={errorMessage} />,
    );

    const errorElement = getByText(errorMessage);
    expect(errorElement).toBeTruthy();

    const errorStyle = errorElement.props.style;
    expect(errorStyle[1].color).toBe('#333333');
  });
});

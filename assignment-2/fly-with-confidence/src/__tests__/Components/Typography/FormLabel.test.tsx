import React from 'react';
import { render } from '@testing-library/react-native';
import FormLabel from '../../../components/typography/FormLabel';

describe('FormLabel', () => {
  it('should render the label with the provided text and text color', () => {
    const labelText = 'Test Label';
    const textColor = 'primary';

    const { getByText } = render(
      <FormLabel content={labelText} color={textColor} />,
    );

    const labelElement = getByText(labelText);
    const labelStyle = labelElement.props.style;

    expect(labelElement).toBeTruthy();
    expect(labelStyle).toBeTruthy();

    expect(labelElement.props.children).toBe(labelText)
    expect(labelStyle[1].color).toBe('#87CEEB');
  });

  it('should apply default styles if no color is provided', () => {
    const labelText = 'Test Label';

    const { getByText } = render(
      <FormLabel content={labelText} />,
    );

    const labelElement = getByText(labelText);
    const labelStyle = labelElement.props.style;

    expect(labelElement).toBeTruthy();
    expect(labelStyle).toBeTruthy();

    expect(labelElement.props.children).toBe(labelText)
    expect(labelStyle[1].color).toBe('#333333');
  });

  it('should apply custom styles when provided', () => {
    const labelText = 'Test Label';
    const customStyles = {
      fontSize: 20,
    };

    const { getByText } = render(
      <FormLabel content={labelText} customStyles={customStyles} />,
    );

    const labelElement = getByText(labelText);
    const labelStyle = labelElement.props.style;

    expect(labelElement).toBeTruthy();
    expect(labelStyle).toBeTruthy();

    expect(labelElement.props.children).toBe(labelText)
    expect(labelStyle[2].fontSize).toBe(20);
  });
});

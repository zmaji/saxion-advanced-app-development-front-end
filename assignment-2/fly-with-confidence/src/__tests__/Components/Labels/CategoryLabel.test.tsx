import React from 'react';
import { render } from '@testing-library/react-native';
import CategoryLabel from '../../../components/labels/CategoryLabel';

describe('CategoryLabel', () => {
  it('should render the label with the provided text, labelColor, and textColor', () => {
    const labelText = 'Test Label';
    const labelColor = 'white';
    const textColor = 'darkGrey';

    const { getByText } = render(
      <CategoryLabel text={labelText} labelColor={labelColor} textColor={textColor} />,
    );

    const labelElement = getByText(labelText);
    expect(labelElement).toBeTruthy();

    const labelStyle = labelElement.props.style;
    expect(labelStyle[0].color).toBe(labelColor);
    expect(labelStyle[1].color).toBe('#333333');
  });

  it('should apply default styles if no colors are provided', () => {
    const labelText = 'Test Label';

    const { getByText } = render(
      <CategoryLabel text={labelText} />,
    );

    const labelElement = getByText(labelText);
    expect(labelElement).toBeTruthy();

    const labelStyle = labelElement.props.style;
    expect(labelStyle[0].color).toBe('white');
    expect(labelStyle[1]).toBe(null);
  });
});

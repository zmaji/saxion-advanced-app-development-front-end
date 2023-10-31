import React from 'react';
import { render } from '@testing-library/react-native';
import TextTitle from '../../../components/typography/TextTitle';

describe('TextTitle', () => {
  it('should render the title with the provided text and text color', () => {
    const titleText = 'Test Title';
    const textColor = 'primary';

    const { getByText } = render(
      <TextTitle content={titleText} color={textColor} />,
    );

    const titleElement = getByText(titleText);
    expect(titleElement).toBeTruthy();

    const titleStyle = titleElement.props.style;
    expect(titleStyle[1].color).toBe('#87CEEB');
  });

  it('should apply default styles if no color is provided', () => {
    const titleText = 'Test Title';

    const { getByText } = render(
      <TextTitle content={titleText} />,
    );

    const titleElement = getByText(titleText);
    expect(titleElement).toBeTruthy();

    const titleStyle = titleElement.props.style;
    expect(titleStyle[1].color).toBe('#333333');
  });

  it('should apply custom styles when provided', () => {
    const titleText = 'Test Title';
    const customStyles = {
      fontSize: 24,
    };

    const { getByText } = render(
      <TextTitle content={titleText} customStyles={customStyles} />,
    );

    const titleElement = getByText(titleText);
    expect(titleElement).toBeTruthy();

    const titleStyle = titleElement.props.style;
    expect(titleStyle[2].fontSize).toBe(24);
  });
});

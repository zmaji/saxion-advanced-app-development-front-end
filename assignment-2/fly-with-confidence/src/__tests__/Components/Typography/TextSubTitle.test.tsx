import React from 'react';
import { render } from '@testing-library/react-native';
import TextSubTitle from '../../../components/typography/TextSubTitle';

describe('TextSubTitle', () => {
  it('should render the sub-title with the provided text and text color', () => {
    const subTitleText = 'Test Sub-Title';
    const textColor = 'primary';

    const { getByText } = render(
      <TextSubTitle content={subTitleText} color={textColor} />,
    );

    const subTitleElement = getByText(subTitleText);
    expect(subTitleElement).toBeTruthy();

    const subTitleStyle = subTitleElement.props.style;
    expect(subTitleStyle[1].color).toBe('#87CEEB');
  });

  it('should apply default styles if no color is provided', () => {
    const subTitleText = 'Test Sub-Title';

    const { getByText } = render(
      <TextSubTitle content={subTitleText} />,
    );

    const subTitleElement = getByText(subTitleText);
    expect(subTitleElement).toBeTruthy();

    const subTitleStyle = subTitleElement.props.style;
    expect(subTitleStyle[0].color).toBe('#333333');
  });

  it('should apply custom styles when provided', () => {
    const subTitleText = 'Test Sub-Title';
    const customStyles = {
      fontSize: 20,
    };

    const { getByText } = render(
      <TextSubTitle content={subTitleText} customStyles={customStyles} />,
    );

    const subTitleElement = getByText(subTitleText);
    expect(subTitleElement).toBeTruthy();

    const subTitleStyle = subTitleElement.props.style;
    expect(subTitleStyle[2].fontSize).toBe(20);
  });
});

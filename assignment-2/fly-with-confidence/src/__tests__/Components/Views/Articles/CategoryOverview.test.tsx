import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CategoryOverview from '../../../../views/Articles/CategoryOverview';

describe('CategoryOverview', () => {
  it('should render the CategoryOverview view with categories', () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const { getAllByText, getByText } = render(
      <CategoryOverview navigation={navigation} />
    );

    const titleElement = getByText('Articles');
    const subtitleElement = getByText('Popular categories');

    const relaxationTechniquesElements = getAllByText('Relaxation techniques');
    const relaxationTechniquesElement = relaxationTechniquesElements[1]

    const educationAndInformationElements = getAllByText('Education and information');
    const educationAndInformationElement = educationAndInformationElements[1]

    const mindfulnessElements = getAllByText('Mindfulness');
    const mindfulnessElement = mindfulnessElements[1]

    const flightActivitiesElements = getAllByText('Flight activities');
    const flightActivitiesElement = flightActivitiesElements[1]

    const preFlightPreparationElements = getAllByText('Pre-flight preparation');
    const preFlightPreparationElement = preFlightPreparationElements[1]

    expect(titleElement).toBeTruthy();
    expect(subtitleElement).toBeTruthy();

    expect(relaxationTechniquesElement).toBeTruthy();
    expect(educationAndInformationElement).toBeTruthy();
    expect(mindfulnessElement).toBeTruthy();
    expect(flightActivitiesElement).toBeTruthy();
    expect(preFlightPreparationElement).toBeTruthy();

    expect(relaxationTechniquesElement.props.children[1]).toBe('Relaxation techniques');
    expect(educationAndInformationElement.props.children[1]).toBe('Education and information');
    expect(mindfulnessElement.props.children[1]).toBe('Mindfulness');
    expect(flightActivitiesElement.props.children[1]).toBe('Flight activities');
    expect(preFlightPreparationElement.props.children[1]).toBe('Pre-flight preparation');
  });

  it('should navigate to ArticleOverview when Relaxation techniques is pressed', () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const { getAllByText } = render(
      <CategoryOverview navigation={navigation} />
    );

    const relaxationTechniquesElements = getAllByText('Relaxation techniques');
    const relaxationTechniquesElement = relaxationTechniquesElements[1]

    fireEvent.press(relaxationTechniquesElement);
    expect(navigation.navigate).toHaveBeenCalledWith('ArticleOverview', { selectedCategory: 'Relaxation techniques' });
  });
});

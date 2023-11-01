import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SidePanelItems from '../../../components/layout/SidePanelItems';
import tokenStore from '../../../stores/tokenStore';
import { Provider } from 'react-redux';

describe('SidePanelItems', () => {
  it('should render the side panel items with the provided title and icon', () => {
    const activeItem = 'CategoryOverview';
    const selectedCategory = 'Education and information';

    const { getByText } = render(
      <Provider store={tokenStore}>
        <SidePanelItems
          navigation={{}}
          activeItem={activeItem}
          selectedCategory={selectedCategory}
        />
      </Provider>
    );

    const articlesItem = getByText('Articles');
    const educationItem = getByText('Education and information');
    const mindfulnessItem = getByText('Mindfulness');
    const flightInfoItem = getByText('Flight information');
    const forumItem = getByText('Forum and discussion');
    const professionalHelpItem = getByText('Professional help');

    expect(articlesItem).toBeTruthy();
    expect(educationItem).toBeTruthy();
    expect(mindfulnessItem).toBeTruthy();
    expect(flightInfoItem).toBeTruthy();
    expect(forumItem).toBeTruthy();
    expect(professionalHelpItem).toBeTruthy();
  });

  it('should call the appropriate onPress function when a side panel item is pressed', () => {
    const activeItem = 'CategoryOverview';
    const selectedCategory = 'Education and information';
    const navigation = {
      navigate: jest.fn(),
    };

    const { getByText } = render(
      <Provider store={tokenStore}>
        <SidePanelItems
          navigation={navigation}
          activeItem={activeItem}
          selectedCategory={selectedCategory}
        />
      </Provider>
    );

    const educationItem = getByText(selectedCategory);
    fireEvent.press(educationItem);

    expect(navigation.navigate).toHaveBeenCalledWith('ArticleOverview', {
      selectedCategory: selectedCategory,
    });
  });
});

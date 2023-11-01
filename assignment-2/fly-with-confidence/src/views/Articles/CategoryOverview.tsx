import React from 'react';
import { ScrollView } from 'react-native';
import { globalStyles } from '../../styles/global';
import { TextTitle, TextSubTitle, SelectionItem } from '../../components';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function CategoryOverview({ navigation }) {
  const popularCategories = [
    {
      id: '1',
      title: 'Relaxation techniques',
      onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Relaxation techniques' }),
    },
    {
      id: '2',
      title: 'Education and information',
      onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Education and information' }),
    },
    {
      id: '3',
      title: 'Mindfulness',
      onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Mindfulness' }),
    },
    {
      id: '4',
      title: 'Flight activities',
      onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Flight activities' }),
    },
    {
      id: '5',
      title: 'Pre-flight preparation',
      onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Pre-flight preparation' }),
    },
  ];

  const categories = [
    {
      id: '1',
      title: 'Anxiety Management',
      onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Anxiety Management' }),
    },
    {
      id: '2',
      title: 'Fear of Flying',
      onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Fear of Flying' }),
    },
    {
      id: '3',
      title: 'Coping Strategies',
      onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Coping Strategies' }),
    },
    {
      id: '4',
      title: 'Travel Anxiety',
      onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Travel Anxiety' }),
    },
    {
      id: '5',
      title: 'Stress Reduction',
      onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Stress Reduction' }),
    },
    {
      id: '6',
      title: 'Coping Methods',
      onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Coping Methods' }),
    },
    {
      id: '7',
      title: 'Anxiety Relief',
      onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Anxiety Relief' }),
    },
    {
      id: '8',
      title: 'Relaxation techniques',
      onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Relaxation techniques' }),
    },
    {
      id: '9',
      title: 'Education and information',
      onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Education and information' }),
    },
    {
      id: '10',
      title: 'Mindfulness',
      onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Mindfulness' }),
    },
    {
      id: '11',
      title: 'Flight activities',
      onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Flight activities' }),
    },
    {
      id: '12',
      title: 'Pre-flight preparation',
      onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Pre-flight preparation' }),
    },
  ];

  return (
    <ScrollView style={globalStyles.pageContainer}>
      <TextTitle content={'Articles'} />
      <TextSubTitle content={'Popular categories'} color={'primary'} />

      {popularCategories.map((category) => {
        return (
          <SelectionItem key={category.id} title={category.title} onPress={category.onPress} />
        );
      })}

      <TextSubTitle content={'All categories'} color={'primary'} customStyles={{ marginTop: 25 }} />
      {categories.map((category) => {
        return (
          <SelectionItem key={category.id} title={category.title} onPress={category.onPress} />
        );
      })}
    </ScrollView>
  );
}

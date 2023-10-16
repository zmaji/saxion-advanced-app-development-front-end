import React from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import { globalStyles } from '../styles/global';
import { TextTitle, TextSubTitle, SelectionItem } from '../components';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function SelectionScreen({ navigation }) {
  const navigationOptions = [
    {
      id: '1',
      title: 'Articles',
      icon: 'newspaper',
      onPress: () => navigation.navigate('CategoryOverview'),
    },
    {
      id: '2',
      title: 'Education and information',
      icon: 'graduation-cap',
      onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Education and information' }),
    },
    {
      id: '3',
      title: 'Mindfulness',
      icon: 'spa',
      onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Mindfulness' }),
    },
    {
      id: '4',
      title: 'Flight information',
      icon: 'plane-departure',
      onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Flight information' }),
    },
    {
      id: '5',
      title: 'Forum and discussion',
      icon: 'comments',
      onPress: () => navigation.navigate('ForumOverview'),
    },
    {
      id: '6',
      title: 'Professional help',
      icon: 'hand-holding-medical',
      onPress: () => navigation.navigate('SelectionScreen'),
    },
  ];

  return (
    <View style={globalStyles.pageContainer}>
      <TextTitle content={'How can we help you?'} />
      <TextSubTitle content={'Select one option'} />

      <SafeAreaView>
        <FlatList
          data={navigationOptions}
          renderItem={({ item }) => <SelectionItem title={item.title} onPress={item.onPress} icon={item.icon} />}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
}

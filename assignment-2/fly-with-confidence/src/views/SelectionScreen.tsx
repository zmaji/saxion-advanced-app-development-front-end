import React from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
} from 'react-native';
import { globalStyles } from '../styles/global';
import { TextTitle, TextSubTitle, SelectionItem } from '../components';

// @ts-ignore
export default function SelectionScreen({ navigation }) {
    const navigationOptions = [
        {
            id: '1',
            title: 'Articles',
            onPress: () => navigation.navigate('CategoryOverview')
        },
        {
            id: '2',
            title: 'Education and information',
            onPress: () => navigation.navigate('SelectionScreen')
        },
        {
            id: '3',
            title: 'Mindfulness',
            onPress: () => navigation.navigate('SelectionScreen')
        },
        {
            id: '4',
            title: 'Flight information',
            onPress: () => navigation.navigate('SelectionScreen')
        },
        {
            id: '5',
            title: 'Forum and discussion',
            onPress: () => navigation.navigate('SelectionScreen')
        },
        {
            id: '6',
            title: 'Professional help',
            onPress: () => navigation.navigate('SelectionScreen')
        },
    ];

    return (
        <View style={globalStyles.pageContainer}>
            <TextTitle content={'How can we help you?'}/>
            <TextSubTitle content={'Select one option'}/>

            <SafeAreaView>
                <FlatList
                    data={navigationOptions}
                    renderItem={({item}) => <SelectionItem title={item.title} onPress={item.onPress} />}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        </View>
    );
};
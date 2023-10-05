import React from 'react';
import {
    FlatList,
    SafeAreaView,
    View,
} from 'react-native';
import { globalStyles } from "../../styles/global";
import TextTitle from "../../components/typography/TextTitle";
import TextSubTitle from "../../components/typography/TextSubTitle";
import SelectionItem from "../../components/SelectionItem";

// @ts-ignore
export default function CategoryOverview({ navigation }) {
    const categories = [
        {
            id: '1',
            title: 'Relaxation techniques',
            onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Relaxation techniques' })
        },
        {
            id: '2',
            title: 'Education and information',
            onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Education and information' })
        },
        {
            id: '3',
            title: 'Mindfulness',
            onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Mindfulness' })
        },
        {
            id: '4',
            title: 'Flight activities',
            onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Flight activities' })
        },
        {
            id: '5',
            title: 'Pre-flight preparation',
            onPress: () => navigation.navigate('ArticleOverview', { selectedCategory: 'Pre-flight preparation' })
        },
    ];

    return (
        <View style={globalStyles.pageContainer}>
            <TextTitle content={'Articles'}/>
            <TextSubTitle content={'Popular categories'} color={'primary'}/>

            <SafeAreaView style={globalStyles.marginBottom}>
                <FlatList
                    data={categories}
                    renderItem={({item}) => <SelectionItem title={item.title} onPress={item.onPress} />}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>

            <TextSubTitle content={'All categories'} color={'primary'}/>
            <SafeAreaView>
                <FlatList
                    data={categories}
                    renderItem={({item}) => <SelectionItem title={item.title} onPress={item.onPress} />}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        </View>
    );
};
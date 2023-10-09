import React from 'react';
import {
    FlatList,
    SafeAreaView,
    View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { globalStyles } from "../../styles/global";
import TextTitle from "../../components/typography/TextTitle";
import TextSubTitle from "../../components/typography/TextSubTitle";
import ArticleOverviewItem from "../../components/ArticleOverviewItem";
import { fontFamilyStyles } from "../../styles/typography";

// @ts-ignore
export default function ArticleOverview({ navigation }) {
    const route = useRoute();
    const selectedCategory = route.params && route.params.selectedCategory;

    const categories = [
        {
            id: '1',
            title: 'Conquering Flight Anxiety with Mindfulness: An Inner Journey',
            onPress: () => navigation.navigate('ArticleDetail', { articleID: 1 })
        },
        {
            id: '2',
            title: 'How Flying Today Is Safer Than At Any Time In The Past',
            onPress: () => navigation.navigate('ArticleDetail', { articleID: 2 })
        },
        {
            id: '3',
            title: 'Coping with Flight Delays and Anxiety',
            onPress: () => navigation.navigate('ArticleDetail', { articleID: 3 })
        },
        {
            id: '4',
            title: 'The Role of Flight Crew in Ensuring Passenger Comfort',
            onPress: () => navigation.navigate('ArticleDetail', { articleID: 4 })
        },
        {
            id: '5',
            title: 'Aviophobia and Its Impact on Travel Choices',
            onPress: () => navigation.navigate('ArticleDetail', { articleID: 5 })
        },
    ];

    return (
        <View style={globalStyles.pageContainer}>
            <TextTitle content={'Articles'}/>

            <View style={globalStyles.subTitleContainer}>
                <TextSubTitle content={'Popular articles in: '} color={'primary'}/>

                <TextSubTitle content={`"${selectedCategory}"`} color={'primary'} customStyles={fontFamilyStyles.loraBoldItalic}/>
            </View>

            <SafeAreaView style={[globalStyles.marginBottom, {height: '85%'}]}>
                <FlatList
                    data={categories}
                    renderItem={({item}) => <ArticleOverviewItem title={item.title} onPress={item.onPress} />}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        </View>
    );
};
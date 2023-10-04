import React from 'react';
import {
    View,
} from 'react-native';
import { globalStyles } from "../../styles/global";
import { themeColors } from "../../styles/themeColors";
import TextTitle from "../../components/typography/TextTitle";
import TextSubTitle from "../../components/typography/TextSubTitle";

export default function CategoryOverview() {
    return (
        <View style={globalStyles.pageContainer}>
            <TextTitle content={'Articles'}/>
            <TextSubTitle content={'Popular categories'} color={themeColors.primary}/>
        </View>
    );
};
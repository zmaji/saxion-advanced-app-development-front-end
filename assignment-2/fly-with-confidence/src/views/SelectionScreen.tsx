import { View } from "react-native";
import * as React from "react";
import { globalStyles } from "../styles/global";
import TextTitle from "../components/typography/TextTitle";
import TextSubTitle from "../components/typography/TextSubTitle";

export default function SelectionScreen() {
    return (
        <View style={globalStyles.pageContainer}>
            <TextTitle content={'SelectionScreen'}/>
            <TextSubTitle content={'Select one option'}/>
        </View>
    );
}

import { View } from "react-native";
import * as React from "react";
import { globalStyles } from "../styles/global";
import TextTitle from "../components/TextTitle";

export default function SelectionScreen() {
    return (
        <View style={globalStyles.pageContainer}>
            <TextTitle content={'SelectionScreen'}/>
        </View>
    );
}

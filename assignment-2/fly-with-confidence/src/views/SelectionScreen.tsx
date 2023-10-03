import { View } from "react-native";
import * as React from "react";
import TextTitle from "../components/TextTitle";
import { globalStyles } from "../styles/global";

export default function SelectionScreen() {
    return (
        <View style={globalStyles.pageContainer}>
            <TextTitle content={'SelectionScreen'}/>
        </View>
    );
}

import {StyleSheet, Text, View} from "react-native";
import * as React from "react";
import TextTitle from "../components/TextTitle";

export default function SelectionScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <TextTitle content={'SelectionScreen'}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

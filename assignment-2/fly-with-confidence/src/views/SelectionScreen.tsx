import {StyleSheet, Text, View} from "react-native";
import * as React from "react";

export default function SelectionScreen() {
    return (
        <View style={styles.container}>
            <Text>Selection screen</Text>
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

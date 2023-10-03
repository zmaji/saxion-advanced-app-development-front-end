import {StyleSheet, Text} from "react-native";
import * as React from "react";
import { globalStyles } from "../styles/global";


export default function TextTitle() {
    return (
        <Text style={[globalStyles.textColorDarkGrey, globalStyles.montserratBold]}>Selection screen</Text>
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

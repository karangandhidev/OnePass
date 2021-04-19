import {View,Text } from "native-base";
import { css } from "./css";
import React from 'react';
import { ScrollView } from "react-native-gesture-handler";

function Generator(){
    return(
        <ScrollView style={css.scroll}>
            <View style={css.container}>
            <Text style={css.loginbuttontext}>Generator</Text>
            </View>
        </ScrollView>
    );
}
export default Generator
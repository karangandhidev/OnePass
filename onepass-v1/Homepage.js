import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import React,{Component, useState} from 'react';
import  AppLoading  from "expo-app-loading";
import axios from 'react-native-axios'
import {css} from './css'
import {fonts} from './fonts'
// import {NavigationBar} from 'react-native-navbar';


export default function Homepage({navigation})
{
    const [isLoaded] = useFonts(fonts);
    const styles = StyleSheet.create(css);
    if (!isLoaded) {
        return <AppLoading/>;
      } else {
        return (
            <View style={styles.homescreeen}>
            <View style={styles.homestatusbar}>
            <Text style={styles.navbarhead}>OnePass{"\n"}</Text>
            </View>
            <TouchableOpacity style={styles.cards}
            onPress={() => { navigation.navigate("Alldata") ;}}>
            <Text style={styles.carddata}>All Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cards}
            onPress={() => { navigation.navigate("Passwords") ;}}>
            <Text style={styles.carddata}>Passwords</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cards}
            onPress={() => { navigation.navigate("Notes") ;}}>
            <Text style={styles.carddata}>Notes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cards}
            onPress={() => { navigation.navigate("Addresses") ;}}>
            <Text style={styles.carddata}>Addresses</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cards}
            onPress={() => { navigation.navigate("Carddetails") ;}}>
            <Text style={styles.carddata}>Card Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cards}
            onPress={() => { navigation.navigate("Bankdetails") ;}}>
            <Text style={styles.carddata}>Bank Details</Text>
            </TouchableOpacity>
            <StatusBar style="auto" /> 
            </View>
            );
    }
};
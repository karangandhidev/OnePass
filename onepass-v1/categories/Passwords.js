import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import React,{Component, useState} from 'react';
import  AppLoading  from "expo-app-loading";
import axios from 'react-native-axios'
import {css} from '../css'
import {fonts} from '../fonts'
import Icons from 'react-native-vector-icons/MaterialIcons'

export default function Password({navigation})
{
    const [isLoaded] = useFonts(fonts);
    const styles = StyleSheet.create(css);
    if (!isLoaded) {
        return <AppLoading/>;
      } else {
        return (
          <View style={styles.cards_bg}>
          <View style={styles.navbar}>
          <Icons onPress={() => navigation.goBack()} 
          name={'arrow-back'} size={30} 
          color='#F0F5F9' style={styles.iconback}/>
          <Text style={styles.navbar_head}>Passwords</Text>
          <Icons onPress={() => navigation.goBack()} 
          name={'search'} size={30} 
          color='#F0F5F9' style={styles.iconsearch}/>
          </View>
          <TouchableOpacity style={styles.cards}>
          <Text style={styles.carddata}>Sample Card</Text>
          </TouchableOpacity>
          </View>
      );
      }
};
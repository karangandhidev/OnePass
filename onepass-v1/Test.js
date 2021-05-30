import Modal from "react-native-root-modal";
import React, { useState } from "react";
// import {  } from 'native-base';
import { ScrollView } from "react-native-gesture-handler";
import { newcss } from "./newcss";
import { StyleSheet, TouchableOpacity, Button, View, Text } from "react-native";
import Bottomnavbar from "./Bottomnavbar";
import { fonts } from "./fonts";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
export default function Test() {
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(newcss);
  if (!isLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.background}>
        <View style={styles.header}>
          <Text style={styles.fakeheading}></Text>
        </View>
        <View style={styles.textheading}>
          <Text style={styles.heading}>OnePass</Text>
          <Text style={styles.heading}>OnePass</Text>
          <Text style={styles.heading}>OnePass</Text>
          <Text style={styles.heading}>OnePass</Text>
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.screenview}>
            <View style={styles.popupwindow}>
              <View style={styles.popupbox}>
                <View style={styles.popupboxtext}>
                  <Text style={styles.popuptitle}>Title</Text>
                  <Text style={styles.popupcontent}>Some text here</Text>
                </View>
                <View style={styles.popupbuttonbox}>
                  <TouchableOpacity style={styles.popupLeftbutton}>
                    <Text style={styles.popupbuttoncontent}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.popupRightbutton}>
                    <Text style={styles.popupbuttoncontent}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

import Modal from "react-native-root-modal";
import React, { useState, useEffect } from "react";
// import {  } from 'native-base';
import { ScrollView } from "react-native-gesture-handler";
import { newcss } from "./newcss";
import {
  StyleSheet,
  TouchableOpacity,
  Button,
  View,
  TextInput,
  Text,
} from "react-native";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import Bottomnavbar from "./Bottomnavbar";
import { fonts } from "./fonts";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { Dimensions, Switch } from "react-native";

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
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.screenview}>
            <View style={{ flex: 1 }}>
              <Button
                onPress={() => {
                  /* HERE WE GONE SHOW OUR FIRST MESSAGE */
                  showMessage({
                    message: "Simple message",
                    type: "info",
                  });
                }}
                title="Request Details"
                color="#841584"
              />
            </View>
          </View>
        </ScrollView>
        <FlashMessage
          position="top"
          animated={true}
          autoHide={true}
          duration={3000}
        />
      </View>
    );
  }
}

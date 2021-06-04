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
import { Dimensions, Switch } from "react-native";

export default function Test() {
  const deviceWindow = Dimensions.get("window");
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(newcss);
  const [isSpecial, setSpecial] = useState(true);
  const [disablecolor, setDisablecolor] = useState("#f0f5f9");
  const func = () => {
    setSpecial(!isSpecial);
    if (isSpecial) {
      setDisablecolor("#333333");
    } else {
      setDisablecolor("#f0f5f9");
    }
  };
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
            <TouchableOpacity style={styles.generatorpreference} onPress={func}>
              <Text style={[styles.generatorcardtext, { color: disablecolor }]}>
                Special Character Preference
              </Text>
              <Switch
                trackColor={{ false: "#f0f5f9", true: "#6bf060" }}
                thumbColor="#F0F5F9"
                onValueChange={func}
                value={isSpecial}
                style={styles.generatorcardtext}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

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
  const [password, setPassword] = useState("defaultvalue");
  const [degree, setDegree] = useState("90deg");
  let passPoint = 0;
  const [passStat, setPassStat] = useState("Weak");
  const regexArr = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/];
  const PASS_LABELS = ["Too Short", "Weak", "Average", "Strong", "Secure"];
  useEffect(() => {
    if (password.length > 0 && password.length < password.MIN_LEN)
      setPassStat(PASS_LABELS[0]);
    else {
      regexArr.forEach((rgx) => (rgx.test(password) ? (passPoint += 1) : null));
      setPassStat(PASS_LABELS[passPoint]);
    }
  }, [password]);
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
            <TextInput
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            <Text>{passStat}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

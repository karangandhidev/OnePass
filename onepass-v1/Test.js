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
  // const [input, setInput] = useState({
  //   password: "",
  // });
  let passPoint = 0;
  const [passStat, setPassStat] = useState("Weak");
  const regexArr = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/];
  const PASS_LABELS = ["Too Short", "Weak", "Average", "Strong", "Secure"];
  const MAX_LEN = 22;
  const MIN_LEN = 8;
  // const handleInput = (e) => {
  //   const { value, name } = e;
  //   setInput((state) => {
  //     return { ...state, [name]: value };
  //   });
  // };
  useEffect(() => {
    if (
      input.password.length > 0 &&
      input.password.length < input.password.MIN_LEN
    )
      setPassStat(PASS_LABELS[0]);
    else {
      regexArr.forEach((rgx) =>
        rgx.test(input.password) ? (passPoint += 1) : null
      );
      setPassStat(PASS_LABELS[passPoint]);
    }
  }, [input.password]);
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
            <Text style={styles.bodytext}>{passStat}</Text>
            <TextInput
              style={styles.passwordinputbox}
              onChangeText={(text) =>
                handleInput({ value: text, name: "password" })
              }
              placeholder="Enter Password"
              secureTextEntry={true}
              placeholderTextColor="#F0F5F9"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

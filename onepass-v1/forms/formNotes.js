import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import axios from "react-native-axios";
import { css } from "../css";
import { fonts } from "../fonts";
import Icons from "react-native-vector-icons/MaterialIcons";
import AppLoading from "expo-app-loading";
import { ScrollView } from "react-native-gesture-handler";
export default function Notes({ navigation }) {
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(css);
  const [input, setInput] = useState({});

  const handleInput = (e) => {
    const { name, value } = e;
    setInput((values) => {
      return {
        ...values,
        [name]: value,
      };
    });
  };
  const submit = () => {
    axios
      .post("http://10.0.0.2:3000/notes", input, {
        headers: {
          "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Authorization",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS",
        },
      })
      .then(navigation.navigate("Notes"));
  };
  if (!isLoaded) {
    return <AppLoading />;
  } else {
    return (
      <KeyboardAvoidingView
        style={styles.background}
        behavior="padding"
        keyboardVerticalOffset="45"
      >
        <StatusBar barStyle="light-content" backgroundColor="#1E2022" />
        <View style={styles.header}>
          <Icons
            onPress={() => navigation.goBack()}
            name={"chevron-left"}
            size={50}
            color="#F0F5F9"
            style={styles.editbackicon}
          />
        </View>
        <View style={styles.formheadingview}>
          <Text style={styles.formheading}>Note</Text>
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.formview}>
            <Text style={styles.fieldname}>Topic</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "topic" })
              }
              placeholder="Topic"
              placeholderTextColor="#F0F5F9"
            />
            <Text style={styles.fieldname}>Note</Text>
            <TextInput
              style={styles.noteinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "note" })
              }
              multiline={true}
              numberOfLines={12}
              placeholder="Note"
              placeholderTextColor="#F0F5F9"
            />
          </View>

          <View style={styles.formsubmitview}>
            <TouchableOpacity style={styles.submitdata} onPress={submit}>
              <Text style={styles.submitdatatext}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

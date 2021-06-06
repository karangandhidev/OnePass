import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
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

export default function Addresses({ navigation }) {
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
      .post("http://10.0.0.2:3000/address", input, {
        headers: {
          "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Authorization",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS",
        },
      })
      .then(navigation.navigate("Addresses"));
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
        {/* <View style={styles.background}> */}
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
          <Text style={styles.formheading}>Address</Text>
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.formview}>
            <Text style={styles.fieldname}>Name</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "name" })
              }
              placeholder="Name"
              placeholderTextColor="#F0F5F9"
            />
            <Text style={styles.fieldname}>Apartment/Flat</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "apartment" })
              }
              placeholder="Apartment / Flat"
              placeholderTextColor="#F0F5F9"
            />

            <Text style={styles.fieldname}>Street</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "street" })
              }
              placeholder="Street"
              placeholderTextColor="#F0F5F9"
            />

            <Text style={styles.fieldname}>Landmark</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "landmark" })
              }
              placeholder="Landmark"
              placeholderTextColor="#F0F5F9"
            />

            <Text style={styles.fieldname}>City</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "city" })
              }
              placeholder="City"
              placeholderTextColor="#F0F5F9"
            />

            <Text style={styles.fieldname}>State</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "state" })
              }
              placeholder="State"
              placeholderTextColor="#F0F5F9"
            />

            <Text style={styles.fieldname}>Country</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "country" })
              }
              placeholder="Country"
              placeholderTextColor="#F0F5F9"
            />

            <Text style={styles.fieldname}>Pin-Code</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "pincode" })
              }
              keyboardType="numeric"
              placeholder="Pin-Code"
              placeholderTextColor="#F0F5F9"
            />
          </View>
          <View style={styles.formsubmitview}>
            <TouchableOpacity style={styles.submitdata} onPress={submit}>
              <Text style={styles.submitdatatext}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* </View> */}
      </KeyboardAvoidingView>
    );
  }
}

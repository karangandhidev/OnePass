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
import axios from "axios";
import { css } from "../css";
import { fonts } from "../fonts";
import Icons from "react-native-vector-icons/MaterialIcons";
import AppLoading from "expo-app-loading";
import { ScrollView } from "react-native-gesture-handler";

export default function Bank({ navigation }) {
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
      .post("http://10.0.0.2:3000/banks", input, {
        headers: {
          "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Authorization",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS",
        },
      })
      .then(navigation.navigate("BankDetails"));
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
          <Text style={styles.formheading}>Bank Detail</Text>
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.formview}>
            <Text style={styles.fieldname}>Bank Name</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "bank_name" })
              }
              placeholder="Bank Name"
              placeholderTextColor="#F0F5F9"
            />

            <Text style={styles.fieldname}>Account Number</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "acc_no" })
              }
              placeholder="Account Number"
              secureTextEntry={true}
              placeholderTextColor="#F0F5F9"
            />

            <Text style={styles.fieldname}>IFSC Code</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "ifsc" })
              }
              placeholder="IFSC Code"
              placeholderTextColor="#F0F5F9"
            />

            <Text style={styles.fieldname}>Branch</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "branch" })
              }
              placeholder="Branch Name"
              placeholderTextColor="#F0F5F9"
            />

            <Text style={styles.fieldname}>Telephone Number</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "telephone" })
              }
              keyboardType="numeric"
              placeholder="Telephone Number"
              placeholderTextColor="#F0F5F9"
            />

            <Text style={styles.fieldname}>Note</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "note" })
              }
              placeholder="Notes"
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

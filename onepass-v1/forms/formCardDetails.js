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
import React, { useState, useEffect } from "react";
import axios from "react-native-axios";
import { css } from "../css";
import { fonts } from "../fonts";
import Icons from "react-native-vector-icons/MaterialIcons";

import AppLoading from "expo-app-loading";
import { ScrollView } from "react-native-gesture-handler";
import FlashMessage, { showMessage } from "react-native-flash-message";

export default function CardDetails({ navigation }) {
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(css);
  const [input, setInput] = useState({});
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [validate, setValidate] = useState(false);
  const [validmonth, setvalidMonth] = useState(false);
  const [validyear, setvalidYear] = useState(false);
  useEffect(() => {
    if (month < 13 && month > 0) {
      setvalidMonth(true);
    } else {
      setvalidMonth(false);
    }
    if (year < 3000 && year > 2020) {
      setvalidYear(true);
    } else {
      setvalidYear(false);
    }
    if (
      input.bank_name === "" ||
      input.name === "" ||
      input.password === "" ||
      String(input.number).length !== 16 ||
      String(input.cvv).length !== 3
    ) {
      setValidate(false);
    } else {
      setValidate(true);
    }
  }),
    [input];
  const handleInput = (e) => {
    const { name, value } = e;
    setInput((values) => {
      return {
        ...values,
        [name]: value,
      };
    });
  };

  const moe = `${month}/${year}`;
  const submit = () => {
    if (validate && validmonth && validyear) {
      axios
        .post(
          "http://10.0.0.2:3000/cards",
          {
            name: input.name,
            number: input.number,
            cvv: input.cvv,
            moe: moe,
            bankname: input.bankname,
            password: input.password,
            notes: input.notes,
          },
          {
            headers: {
              "Access-Control-Allow-Headers":
                "Access-Control-Allow-Headers, Authorization",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS",
            },
          }
        )
        .then(navigation.navigate("Homepage"))
        .catch((err) => {
          console.log(err);
        });
      showMessage({
        message: "Data Added",
        color: "#f0f5f9",
        backgroundColor: "#6bf060",
        style: {
          borderRadius: 20,
          height: 50,
        },
      });
    } else {
      showMessage({
        message: "Invalid Input",
        color: "#f0f5f9",
        backgroundColor: "#E4252D",
        style: {
          borderRadius: 20,
          height: 50,
        },
      });
    }
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
          <Text style={styles.formheading}>Card Detail</Text>
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.formview}>
            <Text style={styles.fieldname}>Card Holder Name</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "name" })
              }
              placeholder="Card Holder Name"
              placeholderTextColor="#858282"
            />

            <Text style={styles.fieldname}>Card Number</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "number" })
              }
              maxLength={16}
              keyboardType="numeric"
              placeholder="Card Number"
              placeholderTextColor="#858282"
            />

            <Text style={styles.fieldname}>CVV</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) => handleInput({ value: text, name: "cvv" })}
              maxLength={3}
              placeholder="CVV"
              keyboardType="numeric"
              placeholderTextColor="#858282"
            />
            <Text style={styles.fieldname}>Month Of Expiry</Text>
            <View style={styles.moeform}>
              <TextInput
                style={styles.moeinput}
                onChangeText={(text) => setMonth(text)}
                placeholder="MM"
                keyboardType="numeric"
                placeholderTextColor="#858282"
              />
              <Text style={styles.moename}>/</Text>
              <TextInput
                style={styles.moeinput}
                onChangeText={(text) => setYear(text)}
                placeholder="YYYY"
                keyboardType="numeric"
                placeholderTextColor="#858282"
              />
            </View>
            <Text style={styles.fieldname}>Bank Name</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "bankname" })
              }
              placeholder="Bank Name"
              placeholderTextColor="#858282"
            />

            <Text style={styles.fieldname}>Pin</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "password" })
              }
              placeholder="Password"
              placeholderTextColor="#858282"
            />

            <Text style={styles.fieldname}>Note</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "notes" })
              }
              placeholder="Note"
              placeholderTextColor="#858282"
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

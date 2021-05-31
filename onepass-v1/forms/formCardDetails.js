import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import axios from "react-native-axios";
import { newcss } from "../newcss";
import { fonts } from "../fonts";
import Icons from "react-native-vector-icons/MaterialIcons";

import AppLoading from "expo-app-loading";
import { ScrollView } from "react-native-gesture-handler";

export default function CardDetails({ navigation }) {
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(newcss);
  const [input, setInput] = useState({});
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
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
    axios
      .post(
        "http://10.0.0.9:3000/cards",
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
      .then(navigation.navigate("CardDetails"));
  };
  if (!isLoaded) {
    return <AppLoading />;
  } else {
    return (
      <KeyboardAvoidingView
        style={styles.background}
        behavior="padding"
        keyboardVerticalOffset="20"
      >
        <View style={styles.header}>
          <Text style={styles.fakeheading}></Text>
        </View>
        <View style={styles.formheaders}>
          <Icons
            onPress={() => navigation.goBack()}
            name={"arrow-back"}
            size={30}
            color="#F0F5F9"
            style={styles.formheadericon}
          />
        </View>
        <View style={styles.formheaders2}>
          <Text style={styles.formheading}>Card Details</Text>
        </View>
        <ScrollView style={styles.scroll}>
          <View style={([styles.screenview], { alignItems: "flex-start" })}>
            <Text style={styles.fieldname}>{"\n"}Card Holder Name</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "name" })
              }
              placeholder="Card Holder Name"
              placeholderTextColor="#000000"
            />

            <Text style={styles.fieldname}>{"\n"}Card Number</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "number" })
              }
              keyboardType="numeric"
              placeholder="Card Number"
              placeholderTextColor="#000000"
            />

            <Text style={styles.fieldname}>{"\n"}CVV</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) => handleInput({ value: text, name: "cvv" })}
              placeholder="CVV"
              keyboardType="numeric"
              placeholderTextColor="#000000"
            />
            <Text style={styles.fieldname}>
              {"\n"}Month Of Expiry{"\n"}
            </Text>
            <View style={styles.moeview}>
              <TextInput
                style={styles.moeinput}
                onChangeText={(text) => setMonth(text)}
                placeholder="Month"
                keyboardType="numeric"
                placeholderTextColor="#000000"
              />
              <Text style={styles.moename}>/</Text>
              <TextInput
                style={styles.moeinput}
                onChangeText={(text) => setYear(text)}
                placeholder="Year"
                keyboardType="numeric"
                placeholderTextColor="#000000"
              />
            </View>
            <Text style={styles.fieldname}>{"\n"}Bank Name</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "bankname" })
              }
              placeholder="Bank Name"
              placeholderTextColor="#000000"
            />

            <Text style={styles.fieldname}>{"\n"}Password</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "password" })
              }
              placeholder="Password"
              placeholderTextColor="#000000"
            />

            <Text style={styles.fieldname}>{"\n"}Note</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "notes" })
              }
              placeholder="Note"
              placeholderTextColor="#000000"
            />

            <View style={styles.deletebuttonview}>
              <Text>
                {"\n"}
                {"\n"}
              </Text>
              <TouchableOpacity style={styles.submitdata} onPress={submit}>
                <Text style={styles.deletebuttontext}>Submit</Text>
              </TouchableOpacity>
            </View>
            <Text>
              {"\n"}
              {"\n"}
              {"\n"}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

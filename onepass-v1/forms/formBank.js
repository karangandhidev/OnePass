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
import axios from "axios";
import { css } from "../css";
import { fonts } from "../fonts";
import Icons from "react-native-vector-icons/MaterialIcons";
import AppLoading from "expo-app-loading";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { ScrollView } from "react-native-gesture-handler";

export default function Bank({ navigation }) {
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(css);
  const [input, setInput] = useState({});
  const [validate, setValidate] = useState(false);
  const [lv, setlv] = useState(false);
  useEffect(() => {
    console.log(String(input.acc_no).length);
    console.log(String(input.ifsc).length);
    if (String(input.acc_no).length > 7 && String(input.acc_no).length < 17) {
      setlv(true);
    } else {
      setlv(false);
    }
    if (
      input.bank_name === "" ||
      input.branch === "" ||
      input.telephone === "" ||
      String(input.ifsc).length !== 11
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

  const submit = () => {
    console.log(input);
    if (validate && lv) {
      axios
        .post("http://10.0.0.2:3000/banks", input, {
          headers: {
            "Access-Control-Allow-Headers":
              "Access-Control-Allow-Headers, Authorization",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS",
          },
        })
        .then(navigation.navigate("Homepage"));
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
              placeholderTextColor="#858282"
            />

            <Text style={styles.fieldname}>Account Number</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "acc_no" })
              }
              maxLength={18}
              placeholder="Account Number"
              placeholderTextColor="#858282"
            />

            <Text style={styles.fieldname}>IFSC Code</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "ifsc" })
              }
              maxLength={11}
              placeholder="IFSC Code"
              placeholderTextColor="#858282"
            />

            <Text style={styles.fieldname}>Branch</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "branch" })
              }
              placeholder="Branch Name"
              placeholderTextColor="#858282"
            />

            <Text style={styles.fieldname}>Telephone Number</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "telephone" })
              }
              maxLength={10}
              keyboardType="numeric"
              placeholder="Telephone Number"
              placeholderTextColor="#858282"
            />

            <Text style={styles.fieldname}>Note</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "note" })
              }
              placeholder="Notes"
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

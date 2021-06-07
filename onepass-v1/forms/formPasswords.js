import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TextInput,
  View,
  Clipboard,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useFonts } from "expo-font";
import React, { useState, useEffect } from "react";
import axios from "react-native-axios";
import { css } from "../css";
import { fonts } from "../fonts";
import Icons from "react-native-vector-icons/MaterialIcons";
import AppLoading from "expo-app-loading";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
export default function Password({ navigation }) {
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(css);
  const [input, setInput] = useState({});
  const [password, setPassword] = useState("");
  const preference = useSelector((state) => state.preference.preference);
  const [validate, setValidate] = useState(false);
  useEffect(() => {
    console.log(input);
    if (
      input.name === "" ||
      input.category === "" ||
      input.url === "" ||
      input.username === "" ||
      input.email === "" ||
      input.password === ""
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
  const genPass = () => {
    axios
      .post("http://10.0.0.2:3000/generatepass", {
        length: preference.length,
        numbers: preference.isNumber,
        lowercase: preference.isLower,
        uppercase: preference.isUpper,
        symbols: preference.isSpecial,
        exclude: preference.exclusion,
      })
      .then((res) => {
        console.log(res.data);
        setPassword(res.data);
        setInput((state) => {
          return {
            ...state,
            password: res.data,
          };
        });
      });
  };
  const submit = () => {
    if (validate) {
      axios
        .post("http://10.0.0.2:3000/passwords", input, {
          headers: {
            "Access-Control-Allow-Headers":
              "Access-Control-Allow-Headers, Authorization",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS",
          },
        })
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
          <Text style={styles.formheading}>Credentials</Text>
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
              placeholderTextColor="#858282"
            />

            <Text style={styles.fieldname}>Category</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "category" })
              }
              placeholder="Category"
              placeholderTextColor="#858282"
            />

            <Text style={styles.fieldname}>URL</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) => handleInput({ value: text, name: "url" })}
              placeholder="https://www.example.com"
              placeholderTextColor="#858282"
            />

            <Text style={styles.fieldname}>Username</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "username" })
              }
              placeholder="User Name"
              placeholderTextColor="#858282"
            />

            <Text style={styles.fieldname}>Email</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "email" })
              }
              placeholder="Email"
              placeholderTextColor="#858282"
            />
            <View style={styles.generateinform}>
              <Text style={styles.generatename}>Password</Text>
              <Icons
                onPress={genPass}
                name={"autorenew"}
                size={30}
                color="#F0F5F9"
              />
            </View>
            <TextInput
              key={password}
              style={styles.fieldinput}
              defaultValue={password}
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
                handleInput({ value: text, name: "note" })
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

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Switch,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import axios from "react-native-axios";
import { newcss } from "./newcss";
import { fonts } from "./fonts";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";

export default function Login({ navigation }) {
  const [input, setInput] = useState("");
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(newcss);

  const creds = useSelector((state) => state.reducer.creds);

  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const getData = async () => {
      await axios.get("http://10.0.0.3:3000/creds").then((res) => {
        dispatch({ type: "GET_DATA", data: res.data });
      });
    };
    getData();
  }, [dispatch]);
  const login = (e) => {
    e.preventDefault();
    if (input !== "") {
      axios
        .post(
          "http://10.0.0.3:3000/login",
          {
            username: creds.username,
            password: input,
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
        .then((res) => {
          dispatch({ type: "LOGIN", data: res.data });
          setInput("");
          navigation.navigate("Login2FA");
          // navigation.navigate("Bottomnavbar");
        })
        .catch((er) => {
          console.log("error");
        });
    } else {
      alert("Credentials cannot be empty");
    }
  };
  if (!isLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView style={styles.scroll}>
        <KeyboardAvoidingView
          style={styles.background}
          behavior="padding"
          keyboardVerticalOffset="20"
        >
          <StatusBar barStyle="light-content" backgroundColor="#000000" />
          <View style={styles.background}>
            <Text style={styles.loginheader}>One-Pass</Text>
            <Text style={styles.slogan}>
              Keep your credentials to yourself!
            </Text>
            <Text style={styles.username}>
              {creds.username ? `Hello ${creds.username}` : null}
            </Text>
            <Text style={styles.bodytext}>Password</Text>
            <TextInput
              style={styles.passwordinputbox}
              onChangeText={(text) => setInput(text)}
              value={input}
              secureTextEntry={true}
            />
            <View style={styles.hinttoggle}>
              <Text style={styles.hinttext}>Enable Hint</Text>
              <Switch
                trackColor={{ false: "#1E2022", true: "#F0F5F9" }}
                thumbColor="#F0F5F9"
                onValueChange={(value) => setToggle(value)}
                value={toggle}
              />
            </View>
            <View style={styles.empty}>
              {toggle ? <Text style={styles.hint}>{creds.hint}</Text> : null}
            </View>
            <TouchableOpacity style={styles.button} onPress={(e) => login(e)}>
              <Text style={styles.loginbuttontext}>Continue</Text>
            </TouchableOpacity>
            <Text style={styles.slogan}>
              Not registered? Create account now
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text style={styles.loginbuttontext}>Register</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

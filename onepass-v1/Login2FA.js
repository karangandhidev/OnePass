import React, { useState, useEffect } from "react";
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
import AppLoading from "expo-app-loading";
import axios from "react-native-axios";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { css } from "./css";
import { fonts } from "./fonts";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import Icons from "react-native-vector-icons/MaterialIcons";

export default function Login2FA({ navigation }) {
  const [input, setInput] = useState("");
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(css);
  const [display, setDisplay] = useState(null);
  const [questions, setQuestions] = useState([]);
  const creds = useSelector((state) => state.reducer.creds);

  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      await axios.get("http://10.0.0.2:3000/questions").then((res) => {
        setQuestions(res.data);
      });
    };
    getData();
  }, [setQuestions]);

  useEffect(() => {
    const index = Math.floor(
      Math.random() * (questions.length - 1 - 0 + 1) + 0
    );
    console.log(questions.length);
    setDisplay(questions[index]);
  }, [questions, setDisplay]);

  const login = (e) => {
    e.preventDefault();
    if (input !== "") {
      axios
        .post(
          "http://10.0.0.2:3000/2ndauth",
          {
            id: display._id,
            answer: input,
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
          setInput("");
          showMessage({
            message: "Successfully Logged In",
            color: "#f0f5f9",
            backgroundColor: "#6bf060",
            style: {
              borderRadius: 20,
              height: 50,
            },
          });
          navigation.navigate("Bottomnavbar");
        })
        .catch((er) => {
          showMessage({
            message: "Answer Incorrect",
            color: "#f0f5f9",
            backgroundColor: "#E4252D",
            style: {
              borderRadius: 20,
              height: 50,
            },
          });
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
      <ScrollView style={styles.scroll}>
        <KeyboardAvoidingView
          style={styles.background}
          behavior="padding"
          keyboardVerticalOffset="45"
        >
          <StatusBar barStyle="light-content" backgroundColor="#000000" />

          <View style={styles.background}>
            <Text style={styles.loginheader}>One-Pass</Text>
            <Text style={styles.slogan}>
              Keep your credentials to yourself!
            </Text>
            <Text style={styles.username}>
              {display ? display.question : null}?
            </Text>

            <Text style={styles.bodytext}>Answer</Text>
            <TextInput
              style={styles.passwordinputbox}
              onChangeText={(text) => setInput(text)}
              // value={input}
            />
            <Text style={styles.bodytext}>{"\n"} </Text>

            <TouchableOpacity style={styles.button} onPress={(e) => login(e)}>
              <Text style={styles.loginbuttontext}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.bodytext}>{"\n"} </Text>
            <Text style={styles.bodytext}>{"\n"} </Text>

            <Icons
              onPress={() => navigation.goBack()}
              name={"arrow-back"}
              size={50}
              color="#F0F5F9"
              style={{ color: "#F0F5F9" }}
            />
            <FlashMessage
              position="top"
              animated={true}
              autoHide={true}
              duration={2000}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

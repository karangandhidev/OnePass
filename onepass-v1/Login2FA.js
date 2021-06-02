import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Switch,
  DevSettings,
} from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import axios from "react-native-axios";
import { css } from "./css";
import { fonts } from "./fonts";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";

export default function Login2FA({ navigation }) {
  const [input, setInput] = useState("");
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(css);
  const [display, setDisplay] = useState(null);
  const [questions, setQuestions] = useState([]);
  const creds = useSelector((state) => state.reducer.creds);

  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const getData = async () => {
      await axios.get("http://10.0.0.4:3000/questions").then((res) => {
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
          "http://10.0.0.4:3000/2ndauth",
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
          navigation.navigate("Bottomnavbar");
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
      <ScrollView style={{ height: "100%" }}>
        <View style={styles.logincontainer}>
          <Text>
            {"\n"}
            {"\n"}
            {"\n"}
            {"\n"}
            {"\n"}
            {"\n"}
          </Text>
          <Text style={styles.bodytext}>
            {display ? display.question : ""}?
          </Text>
          <View style={styles.form}>
            <Text style={styles.bodytext}>{"\n"}Answer</Text>
            <TextInput
              style={[styles.inputbox, { width: 300 }]}
              onChangeText={(text) => setInput(text)}
              value={input}
            />
          </View>
          <Text style={styles.bodytext}>
            {"\n"}
            {"\n"}
          </Text>

          <TouchableOpacity style={styles.button} onPress={(e) => login(e)}>
            <Text style={styles.loginbuttontext}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.bodytext}>
            {"\n"}
            {"\n"}
            {"\n"}Go Back
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.loginbuttontext}>BACK ICON HERE{"\n"}</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    );
  }
}

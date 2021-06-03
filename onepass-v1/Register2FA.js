import React, { useState } from "react";
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
import { fonts } from "./fonts";
import axios from "react-native-axios";
import { newcss } from "./newcss";
import { useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import Icons from "react-native-vector-icons/MaterialIcons";
// import { e } from "express";

export default function Register2FA({ navigation }) {
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(newcss);
  const dispatch = useDispatch();

  const data = navigation.state.params.data;

  console.log(data);
  console.log(data.username);

  const [input, setInput] = useState([
    {
      question: "",
      answer: "",
    },
    {
      question: "",
      answer: "",
    },
    {
      question: "",
      answer: "",
    },
  ]);

  const handleInput = (e) => {
    // e.persist();
    const { value, key, index } = e;
    console.log(value, key, index);
    let array = input;
    array[index][key] = value;
    setInput(array);
  };

  const formValidation = () => {
    let valid = false;
    input.map((inp) => {
      if (inp.question !== "" && inp.answer !== "") {
        valid = true;
      }
    });
    return valid;
  };
  const register = () => {
    if (formValidation()) {
      axios
        .post("http://10.0.0.7:3000/register", data, {
          headers: {
            "Access-Control-Allow-Headers":
              "Access-Control-Allow-Headers, Authorization",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS",
          },
        })
        .then(() => {
          dispatch({
            type: "GET_DATA",
            data: { username: data.username, hint: data.hint },
          });
          navigation.navigate("Login", {
            username: data.username,
            hint: data.hint,
            flag: true,
          });
        })
        .catch((er) => {
          alert(er);
        });
      input.map((inp) => {
        axios.post("http://10.0.0.7:3000/questions", inp).then(() => {
          console.log(inp);
        });
      });
    } else {
      alert("Please fill all questions");
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
            <View key={1} style={styles.form}>
              <Text style={styles.bodytext}>Question 1</Text>
              <TextInput
                style={styles.passwordinputbox}
                id={0}
                onChangeText={(text) =>
                  handleInput({ value: text, key: `question`, index: 0 })
                }
                placeholder="Enter Question"
                placeholderTextColor="#F0F5F9"
              />

              <Text style={styles.bodytext}>Answer</Text>
              <TextInput
                style={styles.passwordinputbox}
                onChangeText={(text) =>
                  handleInput({ value: text, key: `answer`, index: 0 })
                }
                placeholder="Enter Answer"
                placeholderTextColor="#F0F5F9"
              />
            </View>
            <View kwy={2} style={styles.form}>
              <Text style={styles.bodytext}>Question 2</Text>
              <TextInput
                style={styles.passwordinputbox}
                onChangeText={(text) =>
                  handleInput({ value: text, key: `question`, index: 1 })
                }
                placeholder="Enter Question"
                placeholderTextColor="#F0F5F9"
              />
              <Text style={styles.bodytext}>Answer</Text>
              <TextInput
                style={styles.passwordinputbox}
                placeholder="Enter Answer"
                placeholderTextColor="#F0F5F9"
                onChangeText={(text) =>
                  handleInput({ value: text, key: `answer`, index: 1 })
                }
              />
            </View>

            <View key={3} style={styles.form}>
              <Text style={styles.bodytext}>Question 3</Text>
              <TextInput
                style={styles.passwordinputbox}
                onChangeText={(text) =>
                  handleInput({ value: text, key: `question`, index: 2 })
                }
                placeholder="Enter Question"
                placeholderTextColor="#F0F5F9"
              />
              <Text style={styles.bodytext}>Answer</Text>
              <TextInput
                style={styles.passwordinputbox}
                placeholder="Enter Answer"
                placeholderTextColor="#F0F5F9"
                onChangeText={(text) =>
                  handleInput({ value: text, key: `answer`, index: 2 })
                }
              />
            </View>

            {/* <Button onPress = {register}></Button> */}
            <TouchableOpacity style={styles.button} onPress={register}>
              <Text style={styles.loginbuttontext}>Register</Text>
            </TouchableOpacity>

            <Icons
              onPress={() => navigation.goBack()}
              name={"arrow-back"}
              size={50}
              color="#F0F5F9"
              style={{ color: "#F0F5F9" }}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

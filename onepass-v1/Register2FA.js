import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { fonts } from "./fonts";
import axios from "react-native-axios";
import { css } from "./css";
import { useDispatch } from "react-redux";

export default function Register2FA({ navigation }) {
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(css);
  const dispatch = useDispatch();
  const [input, setInput] = useState([
    {
      question: "",
      answer: "",
    },
  ]);
  const [message, setMessage] = useState({
    creds: "Please enter all the credentials",
    password: "Please enter a longer password",
    confirm: "Passwords donot match",
    badpass: "Password cannot be username",
  });

  console.log(input);

  const [number, setNumber] = useState(1);
  const [items, setItems] = useState([
    <View key={0} style={styles.form}>
      <Text style={styles.bodytext}>{"\n"}Question</Text>
      <TextInput
        id={0}
        style={[styles.inputbox, { width: 300 }]}
        onChange={(e) => handleInput(e.target.value, e.target, "question")}
        placeholder="Enter Question"
        placeholderTextColor="#F0F5F9"
      />
      <Text style={styles.bodytext}>{"\n"}Answer</Text>
      <TextInput
        key={0}
        style={[styles.inputbox, { width: 300 }]}
        onChange={(e) => handleInput(e.target.value, e.target.key, "answer")}
        placeholder="Enter Answer"
        placeholderTextColor="#F0F5F9"
      />
    </View>,
  ]);
  let valid = false;
  let length = false;
  let confirm = false;
  const handleInput = (value, key, name) => {
    console.log(value, key, name);
  };

  const removeQuestion = () => {
    setItems((lastItems) => lastItems.filter((item, i) => i + 1 !== number));
    setInput((lastItems) => lastItems.filter((item, i) => i + 1 !== number));

    setNumber(number - 1);
  };

  const addQuestion = () => {
    setItems((state) => {
      return [
        ...state,
        <View key={number} style={styles.form}>
          <Text style={styles.bodytext}>{"\n"}Question</Text>
          <TextInput
            id={number}
            style={[styles.inputbox, { width: 300 }]}
            onChange={(e) =>
              handleInput(e.target.value, e, target.id, "question")
            }
            placeholder="Enter Question"
            placeholderTextColor="#F0F5F9"
          />
          <Text style={styles.bodytext}>{"\n"}Answer</Text>
          <TextInput
            key={number}
            style={[styles.inputbox, { width: 300 }]}
            placeholder="Enter Answer"
            placeholderTextColor="#F0F5F9"
            onChange={(e) =>
              handleInput(e.target.value, e.target.key, "answer")
            }
          />
        </View>,
      ];
    });
    setInput((state) => {
      return [
        ...state,
        {
          question: "",
          answer: "",
        },
      ];
    });
    setNumber(number + 1);
  };

  const formValidation = () => {
    if (
      input.name !== "" &&
      input.password !== "" &&
      input.confirm_password !== ""
    ) {
      valid = true;
      if (input.password.length > 7 && input.password.length <= 22) {
        length = true;
        if (input.password === input.confirm_password) {
          confirm = true;
        }
      }
    }
  };
  const register = () => {
    if (valid) {
      if (length) {
        if (confirm) {
          if (input.password != input.name) {
            const data = {
              username: input.name,
              password: input.password,
              hint: input.hint,
            };
            console.log(data.username);
            axios
              .post("http://10.0.0.4:3000/register", data, {
                headers: {
                  "Access-Control-Allow-Headers":
                    "Access-Control-Allow-Headers, Authorization",
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods":
                    "PUT, DELETE, POST, GET, OPTIONS",
                },
              })
              .then(() => {
                dispatch({
                  type: "GET_DATA",
                  data: { username: input.name, hint: input.hint },
                });
                navigation.navigate("Login", {
                  username: input.name,
                  hint: input.hint,
                  flag: true,
                });
              })
              .catch((er) => {
                alert(er);
              });
          } else {
            alert(message.badpass);
          }
        } else {
          alert(message.confirm);
        }
      } else {
        alert(message.password);
      }
    } else {
      alert(message.creds);
    }
  };

  const combined = () => {
    formValidation();
    register();
  };

  if (!isLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.logincontainer}>
        <Text style={styles.header}>{"\n"}2FA</Text>
        <Text style={styles.bodytext}>
          Add questions for additional security{"\n"}
          {"\n"}
        </Text>
        {items}
        <Text>
          {"\n"}
          {"\n"}
        </Text>
        {number > 1 && (
          <TouchableOpacity style={styles.button} onPress={removeQuestion}>
            <Text style={styles.loginbuttontext}>Remove Question{"\n"}</Text>
          </TouchableOpacity>
        )}
        {number < 5 && (
          <TouchableOpacity style={styles.button} onPress={addQuestion}>
            <Text style={styles.loginbuttontext}>Add More{"\n"}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.loginbuttontext}>Simon go back{"\n"}</Text>
        </TouchableOpacity>
        {/* <Button onPress = {register}></Button> */}
        <TouchableOpacity style={styles.button} onPress={combined}>
          <Text style={styles.loginbuttontext}>Confirm 2FA</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    );
  }
}

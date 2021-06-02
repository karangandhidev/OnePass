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
import { ScrollView } from "react-native-gesture-handler";

export default function Register2FA({ navigation }) {
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(css);
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

  const handleInput = (value, key, index) => {
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
         .post("http://10.0.0.4:3000/register", data, {
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
        axios.post("http://10.0.0.4:3000/questions", inp).then(() => {});
      });
     
    } else {
      alert("Please fill all questions");
    }
  };

  if (!isLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView style={{ height: "100%" }}>
        <View style={styles.logincontainer}>
          <Text style={styles.header}>{"\n"}2FA</Text>
          <Text style={styles.bodytext}>
            Add questions for additional security{"\n"}
            {"\n"}
          </Text>
          <View key={1} style={styles.form}>
            <Text style={styles.bodytext}>{"\n"}Question</Text>
            <TextInput
              id={0}
              style={[styles.inputbox, { width: 300 }]}
              onChange={(e) => handleInput(e.target.value, "question", 0)}
              placeholder="Enter Question"
              placeholderTextColor="#F0F5F9"
            />
            <Text style={styles.bodytext}>{"\n"}Answer</Text>
            <TextInput
              style={[styles.inputbox, { width: 300 }]}
              onChange={(e) => handleInput(e.target.value, "answer", 0)}
              placeholder="Enter Answer"
              placeholderTextColor="#F0F5F9"
            />
          </View>

          <View kwy={2} style={styles.form}>
            <Text style={styles.bodytext}>{"\n"}Question</Text>
            <TextInput
              style={[styles.inputbox, { width: 300 }]}
              onChange={(e) => handleInput(e.target.value, `question`, 1)}
              placeholder="Enter Question"
              placeholderTextColor="#F0F5F9"
            />
            <Text style={styles.bodytext}>{"\n"}Answer</Text>
            <TextInput
              style={[styles.inputbox, { width: 300 }]}
              placeholder="Enter Answer"
              placeholderTextColor="#F0F5F9"
              onChange={(e) => handleInput(e.target.value, `answer`, 1)}
            />
          </View>

          <View key={3} style={styles.form}>
            <Text style={styles.bodytext}>{"\n"}Question</Text>
            <TextInput
              style={[styles.inputbox, { width: 300 }]}
              onChange={(e) => handleInput(e.target.value, `question`, 2)}
              placeholder="Enter Question"
              placeholderTextColor="#F0F5F9"
            />
            <Text style={styles.bodytext}>{"\n"}Answer</Text>
            <TextInput
              style={[styles.inputbox, { width: 300 }]}
              placeholder="Enter Answer"
              placeholderTextColor="#F0F5F9"
              onChange={(e) => handleInput(e.target.value, `answer`, 2)}
            />
          </View>
          <Text>
            {"\n"}
            {"\n"}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.loginbuttontext}>Simon go back{"\n"}</Text>
          </TouchableOpacity>
          {/* <Button onPress = {register}></Button> */}
          <TouchableOpacity style={styles.button} onPress={register}>
            <Text style={styles.loginbuttontext}>Confirm 2FA</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    );
  }
}

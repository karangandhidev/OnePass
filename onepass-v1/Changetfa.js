import React, { useEffect, useState } from "react";
// name  = Hint for hint text input in onChange
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import axios from "axios";
import { useFonts } from "expo-font";
import { fonts } from "./fonts";
import { css } from "./css";
import Icons from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import FlashMessage, { showMessage } from "react-native-flash-message";

export default function Changetfa({ navigation }) {
  const [tfa, setTfa] = useState(false);
  const [input, setInput] = useState([]);
  const styles = StyleSheet.create(css);
  const [isLoaded] = useFonts(fonts);
  useEffect(() => {
    axios
      .get("http://10.0.0.2:3000/questions")
      .then((res) => {
        setInput(res.data);
      })
      .catch((e) => console.log(e));
  }, [setInput]);
  const changeQuestions = () => {
    input.map((i) => {
      axios
        .put("http://10.0.0.2:3000/questions", i)
        .then(() => {
          console.log(i);
        })
        .catch((err) => {
          console.log(err);
          showMessage({
            message: "Invalid Input",
            color: "#f0f5f9",
            backgroundColor: "#E4252D",
            style: {
              borderRadius: 20,
              height: 50,
            },
          });
        });
      navigation.navigate("Login");
      showMessage({
        message: "Data Updated",
        color: "#f0f5f9",
        backgroundColor: "#6bf060",
        style: {
          borderRadius: 20,
          height: 50,
        },
      });
    });
  };

  const addPass = (text) => {
    for (let i = 0; i < input.length; i++) {
      let array = input;
      array[i]["password"] = text;
      setInput(array);
    }
  };

  console.log(input);
  const render = (obj, index) => {
    const handleInput = (text, key, i) => {
      let array = input;
      array[i][key] = text;
      setInput(array);
    };

    return (
      <View key={index} style={styles.questioncard}>
        <Text style={styles.fieldname}>Question {index + 1}</Text>
        {console.log(index)}
        <TextInput
          style={styles.fieldinput}
          onChangeText={(text) => handleInput(text, "question", index)}
          defaultValue={obj.question}
          placeholder="Question"
          placeholderTextColor="#858282"
        />
        <Text style={styles.fieldname}>Answer {index + 1}</Text>

        <TextInput
          style={styles.fieldinput}
          defaultValue={obj.answer}
          onChangeText={(text) => handleInput(text, "answer", index)}
          placeholder="Answer"
          placeholderTextColor="#858282"
        />
      </View>
    );
  };

  const changetfa = () => {
    setTfa(!tfa);
    console.log(tfa);
  };

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
        <Text style={styles.formheading}>Edit 2FA</Text>
      </View>

      {tfa ? (
        <View style={styles.popupbox}>
          <View style={styles.popupheader}>
            <Icons
              class="material-icons-round"
              name={"close"}
              style={styles.closebutton}
              size={30}
              color="transparent"
            />

            <Text style={styles.popuptitle}>Confirmation</Text>
            <TouchableOpacity style={styles.closebutton} onPress={changetfa}>
              <Icons
                class="material-icons-round"
                name={"close"}
                size={30}
                color="#F0F5F9"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.popupcontent}>
            Enter password to delete account
          </Text>
          <TextInput
            style={styles.credentialsinput}
            onChangeText={(text) => addPass(text)}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#858282"
          />
          <TouchableOpacity
            onPress={changeQuestions}
            style={styles.popupRightbutton}
          >
            <Text style={styles.popupbuttoncontent}>Confirm</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.scroll}>
          <View style={styles.screenview}>
            {input.map(render)}

            <View style={styles.formsubmitview}>
              <TouchableOpacity style={styles.submitdata} onPress={changetfa}>
                <Text style={styles.submitdatatext}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}

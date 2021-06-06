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
import { ScrollView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { fonts } from "./fonts";
import { css } from "./css";
import { useDispatch } from "react-redux";
import PassMeter from "react-native-passmeter";
import { Dimensions } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";

export default function Register({ navigation }) {
  const dispatch = useDispatch();
  const [isLoaded] = useFonts(fonts);
  const deviceWindow = Dimensions.get("window");
  const styles = StyleSheet.create(css);
  const MAX_LEN = 22,
    MIN_LEN = 8,
    PASS_LABELS = ["Too Short", "Weak", "Average", "Strong", "Secure"];

  const [input, setInput] = useState({
    name: "",
    password: "",
    confirm_password: "",
    hint: "No Hint Available",
  });

  // const [color, setColor] = useState("#F0F5F9");
  const [message, setMessage] = useState({
    creds: "Please enter all the credentials",
    password: "Please enter a longer password",
    confirm: "Passwords donot match",
    badpass: "Password cannot be username",
  });

  let valid = false;
  let length = false;
  let confirm = false;
  const handleInput = (e) => {
    const { value, name } = e;
    setInput((state) => {
      return { ...state, [name]: value };
    });
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
            if (input.password != input.hint) {
              const data = {
                username: input.name,
                password: input.password,
                hint: input.hint,
              };
              console.log(data);
              navigation.navigate("Register2FA", { data: data });
            } else {
              showMessage({
                message: "Hint & Password cannot be same",
                color: "#f0f5f9",
                type: "danger",
                style: {
                  borderRadius: 20,
                  height: 50,
                },
              });
            }
          } else {
            showMessage({
              message: "Password & Username cannot be same",
              color: "#f0f5f9",
              type: "danger",
              style: {
                borderRadius: 20,
                height: 50,
              },
            });
          }
        } else {
          showMessage({
            message: "Passwords do not match",
            color: "#f0f5f9",
            type: "danger",
            style: {
              borderRadius: 20,
              height: 50,
            },
          });
        }
      } else {
        showMessage({
          message: "Password too short",
          color: "#f0f5f9",
          type: "danger",
          style: {
            borderRadius: 20,
            height: 50,
          },
        });
      }
    } else {
      showMessage({
        message: "Credentials cannot be empty",
        color: "#f0f5f9",
        type: "danger",
        style: {
          borderRadius: 20,
          height: 50,
        },
      });
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
            <Text style={styles.bodytext}>Name</Text>
            <TextInput
              style={styles.passwordinputbox}
              onChangeText={(text) =>
                handleInput({ value: text, name: "name" })
              }
              placeholder="Enter Name"
              placeholderTextColor="#F0F5F9"
            />
            <Text style={styles.bodytext}>Set Password</Text>
            <TextInput
              style={styles.passwordinputbox}
              onChangeText={(text) =>
                handleInput({ value: text, name: "password" })
              }
              placeholder="Enter Password"
              secureTextEntry={true}
              placeholderTextColor="#F0F5F9"
            />
            <View style={styles.passmeter}>
              <PassMeter
                showLabels
                password={input.password}
                maxLength={MAX_LEN}
                minLength={MIN_LEN}
                labels={PASS_LABELS}
              />
            </View>
            <Text style={styles.bodytext}>Confirm Password</Text>
            <TextInput
              style={styles.passwordinputbox}
              onChangeText={(text) =>
                handleInput({ value: text, name: "confirm_password" })
              }
              placeholder="Confirm Password"
              secureTextEntry={true}
              placeholderTextColor="#F0F5F9"
            />
            <Text style={styles.bodytext}>Password Hint</Text>
            <TextInput
              style={styles.passwordinputbox}
              onChangeText={(text) =>
                handleInput({ value: text, name: "hint" })
              }
              placeholder="Hint to remember"
              placeholderTextColor="#F0F5F9"
            />

            {/* <Button onPress = {register}></Button> */}
            <TouchableOpacity
              style={[
                styles.button,
                { marginTop: deviceWindow.height * 0.042 },
              ]}
              onPress={combined}
            >
              <Text style={styles.loginbuttontext}>Register</Text>
            </TouchableOpacity>
            <Text style={styles.slogan}>Already Registered? Login</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.loginbuttontext}>Login</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

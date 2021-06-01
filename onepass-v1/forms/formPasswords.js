import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import axios from "react-native-axios";
import { newcss } from "../newcss";
import { fonts } from "../fonts";
import Icons from "react-native-vector-icons/MaterialIcons";
import AppLoading from "expo-app-loading";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
export default function Password({ navigation }) {
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(newcss);
  const [input, setInput] = useState({});
  const [password, setPassword] = useState("");
  const preference = useSelector((state) => state.preference.preference);
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
      .post("http://127.0.0.1:3000/generatepass", {
        length: preference.length,
        numbers: preference.isNumber,
        lowercase: preference.isLower,
        uppercase: preference.isUpper,
        symbols: preference.isSpecial,
        exclude: preference.exclusion,
      })
      .then((res) => {
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
    axios
      .post("http://127.0.0.1:3000/passwords", input, {
        headers: {
          "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Authorization",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS",
        },
      })
      .then(navigation.navigate("Passwords"));
  };

  if (!isLoaded) {
    return <AppLoading />;
  } else {
    return (
      <KeyboardAvoidingView
        style={styles.background}
        behavior="padding"
        keyboardVerticalOffset="20"
      >
        <View style={styles.header}>
          <Text style={styles.fakeheading}></Text>
        </View>
        <View style={styles.formheaders}>
          <Icons
            onPress={() => navigation.goBack()}
            name={"arrow-back"}
            size={30}
            color="#F0F5F9"
            style={styles.formheadericon}
          />
        </View>
        <View style={styles.formheaders2}>
          <Text style={styles.formheading}>Passwords</Text>
        </View>
        <ScrollView style={styles.scroll}>
          <View style={([styles.screenview], { alignItems: "flex-start" })}>
            <Text style={styles.fieldname}>{"\n"}Name</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "name" })
              }
              placeholder="Name"
              placeholderTextColor="#000000"
            />

            <Text style={styles.fieldname}>{"\n"}Category</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "category" })
              }
              placeholder="Category"
              placeholderTextColor="#000000"
            />

            <Text style={styles.fieldname}>{"\n"}URl</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) => handleInput({ value: text, name: "url" })}
              placeholder="URL"
              placeholderTextColor="#000000"
            />

            <Text style={styles.fieldname}>{"\n"}User Name</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "username" })
              }
              placeholder="User Name"
              placeholderTextColor="#000000"
            />

            <Text style={styles.fieldname}>{"\n"}Email</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "email" })
              }
              placeholder="Email"
              placeholderTextColor="#000000"
            />

            <Text style={styles.fieldname}>{"\n"}Password</Text>
            <TextInput
              style={styles.fieldinput}
              defaultValue={password}
              onChangeText={(text) =>
                handleInput({ value: text, name: "password" })
              }
              placeholder="Password"
              placeholderTextColor="#000000"
            />
            <TouchableOpacity onPress={genPass}>
              <Text>Submit</Text>
            </TouchableOpacity>

            <Text style={styles.fieldname}>{"\n"}Note</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "note" })
              }
              placeholder="Note"
              placeholderTextColor="#000000"
            />

            <View style={styles.deletebuttonview}>
              <Text>
                {"\n"}
                {"\n"}
              </Text>
              <TouchableOpacity style={styles.submitdata} onPress={submit}>
                <Text style={styles.deletebuttontext}>Submit</Text>
              </TouchableOpacity>
            </View>
            <Text>
              {"\n"}
              {"\n"}
              {"\n"}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

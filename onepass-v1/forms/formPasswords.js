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
export default function Password({ navigation }) {
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(newcss);
  const [input, setInput] = useState({});

  const handleInput = (e) => {
    const { name, value } = e;
    setInput((values) => {
      return {
        ...values,
        [name]: value,
      };
    });
  };

  const submit = () => {
    axios
      .post("http://10.0.0.9:3000/passwords", input, {
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
      <KeyboardAvoidingView style={styles.background} behavior="height">
        <View style={styles.header}>
          <Text style={styles.fakeheading}></Text>
        </View>
        <View style={styles.formheaders}>
          <Icons
            onPress={() => navigation.goBack()}
            name={"arrow-back"}
            size={30}
            color="#ffffff"
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
              placeholderTextColor="#F0F5F9"
            />

            <Text style={styles.fieldname}>{"\n"}Category</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "category" })
              }
              placeholder="Category"
              placeholderTextColor="#F0F5F9"
            />

            <Text style={styles.fieldname}>{"\n"}URl</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) => handleInput({ value: text, name: "url" })}
              placeholder="URL"
              placeholderTextColor="#F0F5F9"
            />

            <Text style={styles.fieldname}>{"\n"}User Name</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "username" })
              }
              placeholder="User Name"
              placeholderTextColor="#F0F5F9"
            />

            <Text style={styles.fieldname}>{"\n"}Email</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "email" })
              }
              placeholder="Email"
              placeholderTextColor="#F0F5F9"
            />

            <Text style={styles.fieldname}>{"\n"}Password</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "password" })
              }
              placeholder="Password"
              placeholderTextColor="#F0F5F9"
            />

            <Text style={styles.fieldname}>{"\n"}Note</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "note" })
              }
              placeholder="Note"
              placeholderTextColor="#F0F5F9"
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

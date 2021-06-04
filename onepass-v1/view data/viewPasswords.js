import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Clipboard,
  Linking,
} from "react-native";
import { useFonts } from "expo-font";
import React, { Component, useState, useEffect } from "react";
import AppLoading from "expo-app-loading";
import axios from "react-native-axios";
import { newcss } from "../newcss";
import { fonts } from "../fonts";
import Icons from "react-native-vector-icons/MaterialIcons";
import { store } from "../Redux/globalReducer";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
export default function Password({ navigation }) {
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(newcss);
  const preference = useSelector((state) => state.preference.preference);
  const [editable, setEditable] = useState(false);
  const [deleteable, setdelete] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const [data, setData] = useState(navigation.state.params.key);
  const [password, setPassword] = useState(data.password);
  const handleInput = (e) => {
    const { name, value } = e;
    setData((values) => {
      return {
        ...values,
        [name]: value,
      };
    });
  };

  const genPass = () => {
    axios
      .post("http://10.0.0.3:3000/generatepass", {
        length: preference.length,
        numbers: preference.isNumber,
        lowercase: preference.isLower,
        uppercase: preference.isUpper,
        symbols: preference.isSpecial,
        exclude: preference.exclusion,
      })
      .then((res) => {
        setPassword(res.data);
        setData((state) => {
          return {
            ...state,
            password: res.data,
          };
        });
      });
  };
  console.log(data.password);
  const copy = (karan) => {
    Clipboard.setString(karan);
  };
  const del = () => {
    axios
      .delete(
        `http://10.0.0.3:3000/passwords/${data._id}`,
        {
          name: data.name,
          category: data.category,
          url: data.url,
          username: data.username,
          email: data.email,
          password: password,
          note: data.note,
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
      .then(navigation.navigate("Homepage"));
  };
  const changeState = () => {
    setEditable(!editable);
    setdelete(!deleteable);
    if (editable) {
      navigation.navigate("Passwords");
    }
  };

  const submit = () => {
    axios
      .put(`http://10.0.0.3:3000/passwords/${data._id}`, data, {
        headers: {
          "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Authorization",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS",
        },
      })
      .then(navigation.navigate("Homepage"));
  };
  if (!isLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.background}>
        <View style={styles.view_headerbg}>
          <Text style={styles.fakeheading}></Text>
        </View>
        <View style={styles.view_headingview}>
          {!editable ? (
            <>
              <Text style={styles.view_headingtext}>Passwords</Text>
            </>
          ) : (
            <Text style={styles.view_headingtext}>Editing Mode</Text>
          )}
        </View>

        <View style={styles.view_actualheading}>
          {!editable ? (
            <>
              <Icons
                onPress={() => navigation.goBack()}
                name={"arrow-back"}
                size={30}
                color="#F0F5F9"
                style={styles.editbackicon}
              />
              <TouchableOpacity style={styles.editbutton} onPress={changeState}>
                <Text style={styles.editbuttontext}>Edit</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.cancelbutton}
                onPress={changeState}
              >
                <Text style={styles.cancelbuttontext}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.submitbutton}
                onPress={() => setConfirm(!confirm)}
              >
                <Text style={styles.deletebuttontext}>Delete</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <ScrollView style={styles.scroll}>
          <View style={([styles.screenview], { alignItems: "flex-start" })}>
            {confirm ? (
              <View style={styles.popupbox}>
                <View style={styles.popupboxtext}>
                  <Text style={styles.popuptitle}>Delete</Text>
                  <Text style={styles.popupcontent}>Confirm Deletion</Text>
                </View>
                <View style={styles.popupbuttonbox}>
                  <TouchableOpacity
                    onPress={() => setConfirm(!confirm)}
                    style={styles.popupLeftbutton}
                  >
                    <Text style={styles.popupbuttoncontent}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={del}
                    style={styles.popupRightbutton}
                  >
                    <Text style={styles.popupbuttoncontent}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
            <Text style={styles.fieldname}>{"\n"}Name</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "name" })
              }
              placeholder="Name"
              placeholderTextColor="#000000"
              defaultValue={data.name}
              editable={editable}
            />

            <Text style={styles.fieldname}>{"\n"}Category</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "category" })
              }
              placeholder="Category"
              defaultValue={data.category}
              editable={editable}
              placeholderTextColor="#000000"
            />
            <View style={styles.generateinform}>
              <Text style={styles.fieldname}>{"\n"}URL</Text>
              <Text>
                {"\n"}
                {"\n"}
                <Icons
                  onPress={() => {
                    Linking.openURL(data.url);
                  }}
                  name={"autorenew"}
                  size={30}
                  color="#000000"
                />
              </Text>
            </View>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) => handleInput({ value: text, name: "url" })}
              placeholder="URL"
              defaultValue={data.url}
              editable={editable}
              placeholderTextColor="#000000"
            />
            <Text style={styles.fieldname}>{"\n"}User Name</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "username" })
              }
              placeholder="User Name"
              defaultValue={data.username}
              editable={editable}
              placeholderTextColor="#000000"
            />

            <Text style={styles.fieldname}>{"\n"}Email</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "email" })
              }
              placeholder="Email"
              defaultValue={data.email}
              editable={editable}
              placeholderTextColor="#000000"
            />

            <View style={styles.generateinform}>
              <Text style={styles.generatename}>{"\n"}Password</Text>
              <Text>
                {"\n"}
                {"\n"}
                <Icons
                  onPress={() => {
                    copy(password);
                  }}
                  name={"content-copy"}
                  size={30}
                  color="#000000"
                />
                {editable ? (
                  <>
                    {" "}
                    <Icons
                      onPress={genPass}
                      name={"autorenew"}
                      size={30}
                      color="#000000"
                    />
                  </>
                ) : null}
              </Text>
            </View>
            <TextInput
              key={password}
              style={styles.fieldinput}
              editable={editable}
              defaultValue={password}
              onChangeText={(text) =>
                handleInput({ value: text, name: "password" })
              }
              placeholder="Password"
              placeholderTextColor="#000000"
            />
            <Text style={styles.fieldname}>{"\n"}Note</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "note" })
              }
              defaultValue={data.note}
              editable={editable}
              placeholder="Note"
              placeholderTextColor="#000000"
            />
            <View style={styles.deletebuttonview}>
              <Text>
                {"\n"}
                {"\n"}
              </Text>
              {deleteable ? null : (
                <>
                  <TouchableOpacity
                    style={styles.deletebutton}
                    onPress={submit}
                  >
                    <Text style={styles.submitbuttontext}>Submit</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
            <Text>
              {"\n"}
              {"\n"}
              {"\n"}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

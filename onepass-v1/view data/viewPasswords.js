import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Clipboard,
  Linking,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import { useFonts } from "expo-font";
import React, { Component, useState, useEffect } from "react";
import AppLoading from "expo-app-loading";
import axios from "react-native-axios";
import { css } from "../css";
import { fonts } from "../fonts";
import Icons from "react-native-vector-icons/MaterialIcons";
import { store } from "../Redux/globalReducer";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
export default function Password({ navigation }) {
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(css);
  const preference = useSelector((state) => state.preference.preference);
  const [editable, setEditable] = useState(false);
  const [deleteable, setdelete] = useState(true);
  const [popup, setPopup] = useState(false);

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
      .post("http://10.0.0.2:3000/generatepass", {
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
        `http://10.0.0.2:3000/passwords/${data._id}`,
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
      .put(`http://10.0.0.2:3000/passwords/${data._id}`, data, {
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
      <KeyboardAvoidingView
        style={styles.background}
        behavior="padding"
        keyboardVerticalOffset="45"
      >
        <StatusBar barStyle="light-content" backgroundColor="#1E2022" />

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
                name={"chevron-left"}
                size={50}
                color="#F0F5F9"
                style={styles.editbackicon}
              />
              <TouchableOpacity
                style={[
                  styles.addbutton,
                  { backgroundColor: "transparent", borderWidth: 0 },
                ]}
                onPress={changeState}
              >
                <Icons
                  onPress={changeState}
                  name={"edit"}
                  size={38}
                  color="#f0f5f9"
                />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Icons
                onPress={changeState}
                name={"close"}
                size={40}
                color="#F0F5F9"
                style={styles.cancelediticon}
              />

              <Icons
                style={styles.deletedataicon}
                name={"delete"}
                onPress={() => setPopup(!popup)}
                size={43}
                color="#E4252D"
              />
            </>
          )}
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.screenview}>
            {popup ? (
              <View style={styles.editpopupbox}>
                <View style={styles.editpopupheader}>
                  <Icons
                    class="material-icons-round"
                    name={"close"}
                    style={styles.editclosebutton}
                    size={30}
                    color="transparent"
                  />

                  <Text style={styles.editpopuptitle}>Confirm Delete</Text>
                  <TouchableOpacity
                    style={styles.editclosebutton}
                    onPress={() => {
                      setPopup(!popup);
                    }}
                  >
                    <Icons
                      class="material-icons-round"
                      name={"close"}
                      size={30}
                      color="#F0F5F9"
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.editpopupcontent}>
                  Are you sure you want to delete?
                </Text>
                <TouchableOpacity
                  onPress={del}
                  style={styles.editpopupRightbutton}
                >
                  <Text style={styles.editpopupbuttoncontent}>Confirm</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View style={styles.formview}>
                  <Text style={styles.fieldname}>Name</Text>
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

                  <Text style={styles.fieldname}>Category</Text>
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
                    <Text style={styles.generatename}>URL</Text>
                    {!editable ? (
                      <Icons
                        onPress={() => {
                          Linking.openURL(data.url);
                        }}
                        name={"launch"}
                        size={30}
                        color="#F0F5F9"
                      />
                    ) : null}
                  </View>
                  <TextInput
                    style={styles.fieldinput}
                    onChangeText={(text) =>
                      handleInput({ value: text, name: "url" })
                    }
                    placeholder="URL"
                    defaultValue={data.url}
                    editable={editable}
                    placeholderTextColor="#000000"
                  />
                  <View style={styles.generateinform}>
                    <Text style={styles.generatename}>Username</Text>
                    {!editable ? (
                      <Icons
                        onPress={() => {
                          copy(data.username);
                        }}
                        name={"content-copy"}
                        size={30}
                        color="#F0F5F9"
                      />
                    ) : null}
                  </View>
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

                  <View style={styles.generateinform}>
                    <Text style={styles.generatename}>Email</Text>
                    {!editable ? (
                      <Icons
                        onPress={() => {
                          copy(data.email);
                        }}
                        name={"content-copy"}
                        size={30}
                        color="#F0F5F9"
                      />
                    ) : null}
                  </View>
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
                    <Text style={styles.generatename}>Password</Text>
                    {!editable ? (
                      <Icons
                        onPress={() => {
                          copy(data.note);
                        }}
                        name={"content-copy"}
                        size={30}
                        color="#F0F5F9"
                      />
                    ) : (
                      <Icons
                        onPress={genPass}
                        name={"autorenew"}
                        size={30}
                        color="#F0F5F9"
                      />
                    )}
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
                  <Text style={styles.fieldname}>Note</Text>
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
                </View>

                {deleteable ? null : (
                  <View style={styles.formsubmitview}>
                    <TouchableOpacity
                      style={styles.submitdata}
                      onPress={submit}
                    >
                      <Text style={styles.submitdatatext}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

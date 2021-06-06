import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Clipboard,
  StatusBar,
} from "react-native";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import axios from "react-native-axios";
import { css } from "../css";
import { fonts } from "../fonts";
import Icons from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import AppLoading from "expo-app-loading";

export default function CardDetails({ navigation }) {
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(css);
  const [editable, setEditable] = useState(false);
  const [popup, setPopup] = useState(false);
  const [deleteable, setdelete] = useState(true);
  const [data, setData] = useState(navigation.state.params.key);
  let array = data.moe.split("/");

  console.log(array);
  const handleMOE = (text, id) => {
    array[id] = text;
    let str = `${array[0]}/${array[1]}`;
    setData((state) => {
      return {
        ...state,
        moe: str,
      };
    });
  };
  const handleInput = (e) => {
    const { name, value } = e;
    setData((values) => {
      return {
        ...values,
        [name]: value,
      };
    });
  };
  const del = () => {
    axios
      .delete(`http://10.0.0.2:3000/cards/${data._id}`, data, {
        headers: {
          "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Authorization",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS",
        },
      })
      .then(navigation.navigate("Homepage"));
  };

  const changeState = () => {
    setEditable(!editable);
    setdelete(!deleteable);
    if (editable) {
      navigation.navigate("CardDetails");
    }
  };
  const copy = (text) => {
    Clipboard.setString(text);
  };
  const submit = () => {
    axios
      .put(`http://10.0.0.2:3000/cards/${data._id}`, data, {
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
              <Text style={styles.view_headingtext}>Card Details</Text>
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
                  <Text style={styles.fieldname}>Card Holder Name</Text>
                  <TextInput
                    style={styles.fieldinput}
                    onChangeText={(text) =>
                      handleInput({ value: text, name: "name" })
                    }
                    placeholder="Card Holder Name"
                    // secureTextEntry = {true}
                    defaultValue={data.name}
                    editable={editable}
                    placeholderTextColor="#000000"
                  />

                  <View style={styles.generateinform}>
                    <Text style={styles.generatename}>Card Number</Text>
                    {!editable ? (
                      <Icons
                        onPress={() => {
                          copy(data.number);
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
                      handleInput({ value: text, name: "number" })
                    }
                    placeholder="Card Number"
                    // secureTextEntry = {true}
                    defaultValue={data.number}
                    editable={editable}
                    placeholderTextColor="#000000"
                  />
                  <View style={styles.generateinform}>
                    <Text style={styles.generatename}>CVV</Text>
                    {!editable ? (
                      <Icons
                        onPress={() => {
                          copy(data.cvv);
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
                      handleInput({ value: text, name: "cvv" })
                    }
                    placeholder="CVV"
                    // secureTextEntry = {true}
                    defaultValue={data.cvv}
                    editable={editable}
                    placeholderTextColor="#000000"
                  />

                  <Text style={styles.fieldname}>Month Of Expiry</Text>
                  <View style={styles.moeform}>
                    <TextInput
                      style={styles.moeinput}
                      editable={editable}
                      onChangeText={(text) => handleMOE(text, 0)}
                      placeholder="MM"
                      defaultValue={array[0]}
                      keyboardType="numeric"
                      placeholderTextColor="#F0F5F9"
                    />
                    <Text style={styles.moename}>/</Text>
                    <TextInput
                      editable={editable}
                      style={styles.moeinput}
                      onChangeText={(text) => handleMOE(text, 1)}
                      placeholder="YYYY"
                      defaultValue={array[1]}
                      keyboardType="numeric"
                      placeholderTextColor="#F0F5F9"
                    />
                  </View>

                  <Text style={styles.fieldname}>Bank Name</Text>
                  <TextInput
                    style={styles.fieldinput}
                    onChangeText={(text) =>
                      handleInput({ value: text, name: "bankname" })
                    }
                    placeholder="Bank Name"
                    // secureTextEntry = {true}
                    defaultValue={data.bankname}
                    editable={editable}
                    placeholderTextColor="#000000"
                  />

                  <View style={styles.generateinform}>
                    <Text style={styles.generatename}>Pin</Text>
                    {!editable ? (
                      <Icons
                        onPress={() => {
                          copy(data.password);
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
                      handleInput({ value: text, name: "password" })
                    }
                    placeholder="Password"
                    defaultValue={data.password}
                    editable={editable}
                    // secureTextEntry = {true}
                    placeholderTextColor="#000000"
                  />

                  <Text style={styles.fieldname}>Note</Text>
                  <TextInput
                    style={styles.fieldinput}
                    onChangeText={(text) =>
                      handleInput({ value: text, name: "notes" })
                    }
                    placeholder="Note"
                    defaultValue={data.notes}
                    editable={editable}
                    // secureTextEntry = {true}
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

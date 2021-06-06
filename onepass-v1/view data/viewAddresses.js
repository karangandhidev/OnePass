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

export default function viewaddresses({ navigation }) {
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(css);
  const [editable, setEditable] = useState(false);
  const [popup, setPopup] = useState(false);

  const [deleteable, setdelete] = useState(true);
  const [data, setData] = useState(navigation.state.params.key);
  // const [deletepopup, setDeletepopup] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e;
    setData((values) => {
      return {
        ...values,
        [name]: value,
      };
    });
  };

  const changeState = () => {
    setEditable(!editable);
    setdelete(!deleteable);
    if (editable) {
      navigation.navigate("Addresses");
    }
  };

  const del = () => {
    axios
      .delete(`http://10.0.0.2:3000/address/${data._id}`, data, {
        headers: {
          "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Authorization",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS",
        },
      })
      .then(navigation.navigate("Homepage"));
  };
  const copy = (text) => {
    Clipboard.setString(text);
  };
  const submit = () => {
    axios
      .put(`http://10.0.0.2:3000/address/${data._id}`, data, {
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
              <Text style={styles.view_headingtext}>Addresses</Text>
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
        <View style={styles.screenview}>
          <ScrollView style={styles.scroll}>
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
                  <View style={styles.generateinform}>
                    <Text style={styles.generatename}>Name</Text>
                    {!editable ? (
                      <Icons
                        onPress={() => {
                          copy(data.name);
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
                      handleInput({ value: text, name: "name" })
                    }
                    defaultValue={data.name}
                    editable={editable}
                    placeholder="Name"
                    placeholderTextColor="#000000"
                  />
                  <View style={styles.generateinform}>
                    <Text style={styles.generatename}>Apartment / Flat</Text>
                    {!editable ? (
                      <Icons
                        onPress={() => {
                          copy(data.apartment);
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
                      handleInput({ value: text, name: "apartment" })
                    }
                    defaultValue={data.apartment}
                    editable={editable}
                    placeholder="Apartment / Flat"
                    placeholderTextColor="#000000"
                  />
                  <View style={styles.generateinform}>
                    <Text style={styles.generatename}>Street</Text>
                    {!editable ? (
                      <Icons
                        onPress={() => {
                          copy(data.street);
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
                      handleInput({ value: text, name: "street" })
                    }
                    defaultValue={data.street}
                    editable={editable}
                    placeholder="Street"
                    placeholderTextColor="#000000"
                  />
                  <View style={styles.generateinform}>
                    <Text style={styles.generatename}>Landmark</Text>
                    {!editable ? (
                      <Icons
                        onPress={() => {
                          copy(data.landmark);
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
                      handleInput({ value: text, name: "landmark" })
                    }
                    defaultValue={data.landmark}
                    editable={editable}
                    placeholder="Landmark"
                    placeholderTextColor="#000000"
                  />
                  <View style={styles.generateinform}>
                    <Text style={styles.generatename}>City</Text>
                    {!editable ? (
                      <Icons
                        onPress={() => {
                          copy(data.city);
                        }}
                        name={"content-copy"}
                        size={30}
                        color="#F0F5F9"
                      />
                    ) : null}
                  </View>
                  <TextInput
                    style={styles.fieldinput}
                    defaultValue={data.city}
                    editable={editable}
                    onChangeText={(text) =>
                      handleInput({ value: text, name: "city" })
                    }
                    placeholder="City"
                    placeholderTextColor="#000000"
                  />
                  <View style={styles.generateinform}>
                    <Text style={styles.generatename}>State</Text>
                    {!editable ? (
                      <Icons
                        onPress={() => {
                          copy(data.state);
                        }}
                        name={"content-copy"}
                        size={30}
                        color="#F0F5F9"
                      />
                    ) : null}
                  </View>
                  <TextInput
                    style={styles.fieldinput}
                    defaultValue={data.state}
                    editable={editable}
                    onChangeText={(text) =>
                      handleInput({ value: text, name: "state" })
                    }
                    placeholder="State"
                    placeholderTextColor="#000000"
                  />
                  <View style={styles.generateinform}>
                    <Text style={styles.generatename}>Country</Text>
                    {!editable ? (
                      <Icons
                        onPress={() => {
                          copy(data.country);
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
                      handleInput({ value: text, name: "country" })
                    }
                    placeholder="Country"
                    defaultValue={data.country}
                    editable={editable}
                    placeholderTextColor="#000000"
                  />
                  <View style={styles.generateinform}>
                    <Text style={styles.generatename}>Pin-Code</Text>
                    {!editable ? (
                      <Icons
                        onPress={() => {
                          copy(data.pincode);
                        }}
                        name={"content-copy"}
                        size={30}
                        color="#F0F5F9"
                      />
                    ) : null}
                  </View>
                  <TextInput
                    style={styles.fieldinput}
                    defaultValue={data.pincode}
                    editable={editable}
                    onChangeText={(text) =>
                      handleInput({ value: text, name: "pincode" })
                    }
                    keyboardType="number-pad"
                    placeholder="Pin-Code"
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
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

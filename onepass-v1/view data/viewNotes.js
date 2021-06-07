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
import FlashMessage, { showMessage } from "react-native-flash-message";
import axios from "react-native-axios";
import { css } from "../css";
import { fonts } from "../fonts";
import Icons from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import AppLoading from "expo-app-loading";

export default function Notes({ navigation }) {
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(css);
  const [editable, setEditable] = useState(false);
  const [popup, setPopup] = useState(false);

  const [deleteable, setdelete] = useState(true);
  const [data, setData] = useState(navigation.state.params.key);

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
      .delete(`http://10.0.0.2:3000/notes/${data._id}`, data, {
        headers: {
          "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Authorization",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS",
        },
      })
      .then(navigation.navigate("Homepage"));
    showMessage({
      message: "Data Deleted Successfully",
      color: "#f0f5f9",
      backgroundColor: "#E4252D",
      style: {
        borderRadius: 20,
        height: 50,
      },
    });
  };

  const changeState = () => {
    setEditable(!editable);
    setdelete(!deleteable);
    if (editable) {
      navigation.navigate("Notes");
    }
  };
  const copy = (text) => {
    Clipboard.setString(text);
  };
  const submit = () => {
    axios
      .put(`http://10.0.0.2:3000/notes/${data._id}`, data, {
        headers: {
          "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Authorization",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS",
        },
      })
      .then(navigation.navigate("Homepage"));
    showMessage({
      message: "Data Added",
      color: "#f0f5f9",
      backgroundColor: "#6bf060",
      style: {
        borderRadius: 20,
        height: 50,
      },
    });
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
              <Text style={styles.view_headingtext}>Notes</Text>
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
                  <Text style={styles.fieldname}>Topic</Text>
                  <TextInput
                    style={styles.fieldinput}
                    onChangeText={(text) =>
                      handleInput({ value: text, name: "topic" })
                    }
                    placeholder="Topic"
                    placeholderTextColor="#000000"
                    defaultValue={data.topic}
                    editable={editable}
                  />
                  <View style={styles.generateinform}>
                    <Text style={styles.generatename}>Note</Text>
                    {!editable ? (
                      <Icons
                        onPress={() => {
                          copy(data.note);
                          showMessage({
                            message: "Data Copied!",
                            color: "#f0f5f9",
                            backgroundColor: "#000000",
                            style: {
                              borderRadius: 20,
                              height: 50,
                            },
                          });
                        }}
                        name={"content-copy"}
                        size={30}
                        color="#F0F5F9"
                      />
                    ) : null}
                  </View>
                  <TextInput
                    style={styles.noteinput}
                    onChangeText={(text) =>
                      handleInput({ value: text, name: "note" })
                    }
                    placeholder="Note"
                    placeholderTextColor="#000000"
                    defaultValue={data.note}
                    multiline={true}
                    numberOfLines={12}
                    editable={editable}
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

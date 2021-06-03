import Modal from "react-native-root-modal";
import React, { useState } from "react";
// import {  } from 'native-base';
import { ScrollView } from "react-native-gesture-handler";
import { newcss } from "./newcss";
import { StyleSheet, TouchableOpacity, Button, View, Text } from "react-native";
import Bottomnavbar from "./Bottomnavbar";
import { fonts } from "./fonts";
import Icons from "react-native-vector-icons/MaterialIcons";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { Dimensions } from "react-native";
export default function Test() {
  const deviceWindow = Dimensions.get("window");
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(newcss);
  if (!isLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.background}>
        <View style={styles.header}>
          <Text style={styles.fakeheading}></Text>
        </View>
        <View style={styles.textheading}>
          <Text style={styles.heading}>OnePass</Text>
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.screenview}>
            <TouchableOpacity
              style={{
                marginTop: 25,
                alignItems: "center",
                backgroundColor: "red",
                flex: 1,
                justifyContent: "space-between",
                borderRadius: 15,
                borderWidth: 0.75,
                elevation: 10,
                width: deviceWindow.width * 0.97,
                height: deviceWindow.height * 0.08,
                maxHeight: deviceWindow.height * 0.08,
              }}
            >
              <Icons
                name={"public"}
                size={40}
                color="#F0F5F9"
                // style={{ flex: 1 }}
              />
              <Icons
                name={"chevron-right"}
                size={50}
                color="#F0F5F9"
                // style={{ flex: 1, marginLeft: 20 }}
              />
              <Icons
                name={"chevron-right"}
                size={50}
                color="#F0F5F9"
                // style={{ flex: 1, marginLeft: 20 }}
              />
            </TouchableOpacity>
            {/* <View style={styles.popupwindow}> */}
            {/* <View style={styles.popupbox}>
              <View style={styles.popupboxtext}>
                <Text style={styles.popuptitle}>Title</Text>
                <Text style={styles.popupcontent}>Some text here</Text>
              </View>
              <View style={styles.popupbuttonbox}>
                <TouchableOpacity style={styles.popupLeftbutton}>
                  <Text style={styles.popupbuttoncontent}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => alert("TEST")}
                  style={styles.popupRightbutton}
                >
                  <Text style={styles.popupbuttoncontent}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

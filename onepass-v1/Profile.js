import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StatusBar,
  Button,
  Linking,
} from "react-native";
import { useFonts } from "expo-font";
import { fonts } from "./fonts";
import Icons from "react-native-vector-icons/MaterialIcons";
import { css } from "./css";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Profile({ navigation }) {
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(css);
  const [settings, setSettings] = useState(false);
  const [aboutus, setAboutus] = useState(false);
  const [degree, setDegree] = useState("270deg");
  const [degree2, setDegree2] = useState("270deg");
  const [popup, setPopup] = useState(false);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const prefs = useSelector((state) => state.preference.preference);
  const masterdelete = () => {
    axios
      .post("http://10.0.0.2:3000/masterdelete", { password })
      .then(() => {
        dispatch({ type: "GET_DATA", data: { username: "", hint: "" } });
        navigation.navigate("Login");
      })
      .catch((e) => console.log(e));
  };
  const logout = () => {
    axios.post("http://10.0.0.2:3000/preference", prefs);
    navigation.navigate("Login", { username: "", hint: "" });
  };
  const showSettings = () => {
    setSettings(!settings);
  };
  useEffect(() => {
    if (!settings) {
      setDegree("270deg");
    } else {
      setDegree("90deg");
    }
    if (!aboutus) {
      setDegree2("270deg");
    } else {
      setDegree2("90deg");
    }
  }),
    [settings];
  const showAboutus = () => {
    setAboutus(!aboutus);
  };
  const preference = () => {
    navigation.navigate("ChangePassword");
  };
  const tfa = () => {
    navigation.navigate("Changetfa");
  };

  return (
    <ScrollView style={styles.scroll}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.header2}>
        <Text style={styles.heading}>Profile</Text>
      </View>
      <View style={styles.screenview}>
        {popup ? (
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
              <TouchableOpacity
                style={styles.closebutton}
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
            <Text style={styles.popupcontent}>
              Enter password to delete account
            </Text>
            <TextInput
              style={styles.credentialsinput}
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              placeholderTextColor="#F0F5F9"
            />
            <TouchableOpacity
              onPress={masterdelete}
              style={styles.popupRightbutton}
            >
              <Text style={styles.popupbuttoncontent}>Confirm</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.profilecardview}>
              <TouchableOpacity
                style={styles.profilecard}
                onPress={showSettings}
              >
                <Icons name={"public"} size={40} color="#F0F5F9" />
                <Text style={styles.datacardtext}>Settings</Text>
                <Icons
                  name={"chevron-left"}
                  size={50}
                  color="#F0F5F9"
                  style={[
                    styles.datacardtext,
                    { transform: [{ rotate: degree }] },
                  ]}
                />
              </TouchableOpacity>
              {settings && (
                <>
                  <TouchableOpacity
                    style={styles.profilesubcard}
                    onPress={preference}
                  >
                    <Text style={styles.datacardtext}>Change Credentials</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.profilesubcard} onPress={tfa}>
                    <Text style={styles.datacardtext}>Change 2FA</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
            <View style={styles.profilecardview}>
              <TouchableOpacity
                style={styles.profilecard}
                onPress={showAboutus}
              >
                <Icons name={"people"} size={40} color="#F0F5F9" />
                <Text style={styles.datacardtext}>About Us</Text>
                <Icons
                  name={"chevron-left"}
                  size={50}
                  color="#F0F5F9"
                  style={[
                    styles.datacardtext,
                    { transform: [{ rotate: degree2 }] },
                  ]}
                />
              </TouchableOpacity>
              {aboutus && (
                <>
                  <TouchableOpacity
                    style={styles.profilesubcard}
                    onPress={() => {
                      Linking.openURL(
                        "https://www.linkedin.com/in/samarth-aher-sa09/"
                      );
                    }}
                  >
                    <Text style={styles.datacardtext}>Samarth Aher</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.profilesubcard}
                    onPress={() => {
                      Linking.openURL(
                        "https://www.linkedin.com/in/karangandhi97"
                      );
                    }}
                  >
                    <Text style={styles.datacardtext}>Karan Gandhi</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            <View style={styles.profilecardview}>
              <TouchableOpacity onPress={logout} style={styles.profilecard}>
                <Icons name={"logout"} size={40} color="#F0F5F9" />
                <Text style={styles.datacardtext}>Logout</Text>

                <Text style={{ color: "#1E2022" }}> texth</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.profilecardview}>
              <TouchableOpacity
                onPress={() => {
                  setPopup(!popup);
                }}
                style={styles.profilecard}
              >
                <Icons name={"delete"} size={40} color="#E4252D" />
                <Text style={[styles.datacardtext, { color: "#E4252D" }]}>
                  Delete Account
                </Text>
                <Text style={{ color: "#1E2022" }}> texth</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}
export default Profile;

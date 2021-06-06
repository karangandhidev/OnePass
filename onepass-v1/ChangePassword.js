import React, { useState, useEffect } from "react";
// name  = Hint for hint text input in onChange
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import axios from "axios";
import { useFonts } from "expo-font";
import { fonts } from "./fonts";
import { css } from "./css";
import { useDispatch } from "react-redux";
import Icons from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import FlashMessage, { showMessage } from "react-native-flash-message";

export default function ChangePassword({ navigation }) {
  const [username, setUsername] = useState(false);
  const [password, setPassword] = useState(false);
  const [hint, setHint] = useState(false);
  const [input, setInput] = useState({});
  const styles = StyleSheet.create(css);
  const [isLoaded] = useFonts(fonts);
  const [degree1, setDegree1] = useState("90deg");
  const [degree2, setDegree2] = useState("90deg");
  const [degree3, setDegree3] = useState("90deg");

  const dispatch = useDispatch();

  const handleInput = (e) => {
    const { name, value } = e;
    setInput((values) => {
      return {
        ...values,
        [name]: value,
      };
    });
  };
  const logout = () => {
    navigation.navigate("Login", {
      username: input.Username,
      hint: input.Hint,
      flag: true,
    });
  };
  useEffect(() => {
    if (!username) {
      setDegree1("270deg");
    } else {
      setDegree1("90deg");
    }
    if (!password) {
      setDegree2("270deg");
    } else {
      setDegree2("90deg");
    }
    if (!hint) {
      setDegree3("270deg");
    } else {
      setDegree3("90deg");
    }
  }),
    [username, password, hint];
  const changeCreds = () => {
    if (username) {
      if (input.Username) {
        axios
          .put("http://10.0.0.2:3000/changeusername", {
            Username: input.Username,
          })
          .then(() => {
            dispatch({
              type: "CHANGEDATA",
              data: { key: "username", value: input.Username },
            });
          })
          .catch((err) => {
            console.log(err);
            showMessage({
              message: "Invalid Input",
              color: "#f0f5f9",
              type: "danger",
              style: {
                borderRadius: 20,
                height: 50,
              },
            });
          });
        showMessage({
          message: "Data Updated",
          color: "#f0f5f9",
          type: "success",
          style: {
            borderRadius: 20,
            height: 50,
          },
        });
        logout();
      }
    }
    if (hint) {
      if (input.Hint) {
        axios
          .put("http://10.0.0.2:3000/changehint", {
            hint: input.Hint,
          })
          .then(() =>
            dispatch({
              type: "CHANGEDATA",
              data: { key: "hint", value: input.Hint },
            })
          )
          .catch((err) => {
            console.log(err);
            showMessage({
              message: "Invalid Input",
              color: "#f0f5f9",
              type: "danger",
              style: {
                borderRadius: 20,
                height: 50,
              },
            });
          });

        showMessage({
          message: "Data Updated",
          color: "#f0f5f9",
          type: "success",
          style: {
            borderRadius: 20,
            height: 50,
          },
        });
        logout();
      }
    }
    if (input.OldPassword && input.NewPassword)
      if (input.ConfirmNewPassword === input.NewPassword) {
        axios
          .post("http://10.0.0.2:3000/changepass", {
            OldPassword: input.OldPassword,
            NewPassword: input.NewPassword,
          })
          .catch((err) => {
            console.log(err);
            showMessage({
              message: "Invalid Input",
              color: "#f0f5f9",
              type: "danger",
              style: {
                borderRadius: 20,
                height: 50,
              },
            });
          });
        showMessage({
          message: "Data Updated",
          color: "#f0f5f9",
          type: "success",
          style: {
            borderRadius: 20,
            height: 50,
          },
        });
        logout();
      }
  };

  return (
    <KeyboardAvoidingView
      style={styles.background}
      behavior="padding"
      keyboardVerticalOffset="45"
    >
      <StatusBar barStyle="light-content" backgroundColor="#1E2022" />
      <View style={styles.header}>
        <Icons
          onPress={() => navigation.goBack()}
          name={"chevron-left"}
          size={50}
          color="#F0F5F9"
          style={styles.editbackicon}
        />
      </View>
      <View style={styles.formheadingview}>
        <Text style={styles.formheading}>Edit Settings</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.screenview}>
          <TouchableOpacity
            style={styles.generatorpreference}
            onPress={() => setUsername(!username)}
          >
            <Text style={styles.generatorcardtext}>Edit Username</Text>
            <Icons
              name={"chevron-left"}
              size={50}
              color="#F0F5F9"
              style={[
                styles.generatorcardtext,
                { transform: [{ rotate: degree1 }], color: "#f0f5f9" },
              ]}
            />
          </TouchableOpacity>

          {username && (
            <>
              <View style={styles.formview}>
                <Text style={styles.fieldname}>New Username</Text>
                <TextInput
                  style={styles.fieldinput}
                  onChangeText={(text) =>
                    handleInput({ value: text, name: "Username" })
                  }
                  placeholder="New Username"
                  placeholderTextColor="#F0F5F9"
                />
              </View>
            </>
          )}
          <TouchableOpacity
            style={styles.generatorpreference}
            onPress={() => setHint(!hint)}
          >
            <Text style={styles.generatorcardtext}>Edit Hint</Text>

            <Icons
              name={"chevron-left"}
              size={50}
              color="#F0F5F9"
              style={[
                styles.generatorcardtext,
                { transform: [{ rotate: degree3 }], color: "#f0f5f9" },
              ]}
            />
          </TouchableOpacity>

          {hint && (
            <>
              <View style={styles.formview}>
                <Text style={styles.fieldname}>New Hint</Text>
                <TextInput
                  style={styles.fieldinput}
                  onChangeText={(text) =>
                    handleInput({ value: text, name: "Hint" })
                  }
                  placeholder="New Hint"
                  placeholderTextColor="#F0F5F9"
                />
              </View>
            </>
          )}
          <TouchableOpacity
            style={styles.generatorpreference}
            onPress={() => setPassword(!password)}
          >
            <Text style={styles.generatorcardtext}>Edit Password</Text>

            <Icons
              name={"chevron-left"}
              size={50}
              color="#F0F5F9"
              style={[
                styles.generatorcardtext,
                { transform: [{ rotate: degree2 }], color: "#f0f5f9" },
              ]}
            />
          </TouchableOpacity>
          {password && (
            <>
              <View style={styles.formview}>
                <Text style={styles.fieldname}>Old Password</Text>
                <TextInput
                  style={styles.fieldinput}
                  onChangeText={(text) =>
                    handleInput({ value: text, name: "OldPassword" })
                  }
                  placeholder="Old Password"
                  placeholderTextColor="#F0F5F9"
                />
                <Text style={styles.fieldname}>New Password</Text>
                <TextInput
                  style={styles.fieldinput}
                  onChangeText={(text) =>
                    handleInput({ value: text, name: "NewPassword" })
                  }
                  placeholder="New Password"
                  placeholderTextColor="#F0F5F9"
                />
                <Text style={styles.fieldname}>Confirm New Password</Text>
                <TextInput
                  style={styles.fieldinput}
                  onChangeText={(text) =>
                    handleInput({ value: text, name: "ConfirmNewPassword" })
                  }
                  placeholder="Confirm New Password"
                  placeholderTextColor="#F0F5F9"
                />
              </View>
            </>
          )}
          <View style={styles.formsubmitview}>
            <TouchableOpacity style={styles.submitdata} onPress={changeCreds}>
              <Text style={styles.submitdatatext}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

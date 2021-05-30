import React, { useState } from "react";
// name  = Hint for hint text input in onChange
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import axios from "axios";
import { useFonts } from "expo-font";
import { fonts } from "./fonts";
import { newcss } from "./newcss";
import { useDispatch } from "react-redux";
import Icons from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
export default function ChangePassword({ navigation }) {
  const [username, setUsername] = useState(false);
  const [password, setPassword] = useState(false);
  const [hint, setHint] = useState(false);
  const [input, setInput] = useState({});
  const styles = StyleSheet.create(newcss);
  const [isLoaded] = useFonts(fonts);
  // const [flaguser, setFlaguser] = useState(false);
  // const [flaghint, setFlaghint] = useState(false);
  // const [flagpass, setflagpass] = useState(false);

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
    navigation.navigate("Login");
  };
  const changeCreds = () => {
    if (username) {
      if (input.Username) {
        axios
          .put("http://10.0.0.9:3000/changeusername", {
            Username: input.Username,
          })
          .then(() => {
            dispatch({
              type: "CHANGEDATA",
              data: { key: "username", value: input.Username },
            });
          })
          .catch((err) => console.log(err));
      }
    }
    if (hint) {
      if (input.Hint) {
        axios
          .put("http://10.0.0.9:3000/changehint", {
            hint: input.Hint,
          })
          .then(() =>
            dispatch({
              type: "CHANGEDATA",
              data: { key: "hint", value: input.Hint },
            })
          );
      }
    }
    if (input.OldPassword && input.NewPassword)
      if (input.ConfirmNewPassword === input.NewPassword) {
        axios.post("http://10.0.0.9:3000/changepass", {
          OldPassword: input.OldPassword,
          NewPassword: input.NewPassword,
        });
        logout();
      }
  };
  const changeusername = () => {
    setUsername(!username);
  };
  const changehint = () => {
    setHint(!hint);
  };
  const changepassword = () => {
    setPassword(!password);
  };
  return (
    <View style={styles.background}>
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
        <Text style={styles.formheading}>Change Credentials</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.credentialsview}>
          <TouchableOpacity
            style={styles.credentialstouchable}
            onPress={changeusername}
          >
            <Text style={styles.credentialstouchabletext}>Change Username</Text>
          </TouchableOpacity>
          {username && (
            <>
              <Text style={styles.credentialsname}>New Username</Text>
              <TextInput
                style={styles.credentialsinput}
                onChangeText={(text) =>
                  handleInput({ value: text, name: "Username" })
                }
                placeholder="New Username"
                placeholderTextColor="#000000"
              />
            </>
          )}
          <TouchableOpacity
            style={styles.credentialstouchable}
            onPress={changehint}
          >
            <Text style={styles.credentialstouchabletext}>Change Hint</Text>
          </TouchableOpacity>
          {hint && (
            <>
              <Text style={styles.credentialsname}>New Hint</Text>
              <TextInput
                style={styles.credentialsinput}
                onChangeText={(text) =>
                  handleInput({ value: text, name: "Hint" })
                }
                placeholder="New Hint"
                placeholderTextColor="#000000"
              />
            </>
          )}

          <TouchableOpacity
            style={styles.credentialstouchable}
            onPress={changepassword}
          >
            <Text style={styles.credentialstouchabletext}>Change Password</Text>
          </TouchableOpacity>
          {password && (
            <>
              <Text style={styles.credentialsname}>Old Password</Text>
              <TextInput
                style={styles.credentialsinput}
                onChangeText={(text) =>
                  handleInput({ value: text, name: "OldPassword" })
                }
                placeholder="Old Password"
                placeholderTextColor="#000000"
              />
              <Text style={styles.credentialsname}>New Password</Text>
              <TextInput
                style={styles.credentialsinput}
                onChangeText={(text) =>
                  handleInput({ value: text, name: "NewPassword" })
                }
                placeholder="New Password"
                placeholderTextColor="#000000"
              />
              <Text style={styles.credentialsname}>Confirm New Password</Text>
              <TextInput
                style={styles.credentialsinput}
                onChangeText={(text) =>
                  handleInput({ value: text, name: "ConfirmNewPassword" })
                }
                placeholder="Confirm New Password"
                placeholderTextColor="#000000"
              />
            </>
          )}
          <View style={styles.deletebuttonview}>
            <Text>
              {"\n"}
              {"\n"}
            </Text>
            <TouchableOpacity style={styles.submitdata} onPress={changeCreds}>
              <Text style={styles.submitdatatext}>Confirm</Text>
            </TouchableOpacity>
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

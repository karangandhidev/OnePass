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
import { ScrollView } from "react-native-gesture-handler";
export default function ChangePassword() {
  const [username, setUsername] = useState(false);
  const [password, setPassword] = useState(false);
  const [hint, setHint] = useState(false);
  const [input, setInput] = useState({});
  const styles = StyleSheet.create(newcss);
  const [isLoaded] = useFonts(fonts);
  console.log(input)
  const handleInput = (e) => {
    const { name, value } = e;
    setInput((values) => {
      return {
        ...values,
        [name]: value,
      };
    });
  };
  const changeCreds = () => {
    if (username) {
      if (input.Username) {
        axios
          .put("http://10.0.0.3:3000/changeusername", {
            Username: input.Username,
          })
          .catch((err) => console.log(err));
      }
    }
    if (hint) {
      if (input.Hint) {
        axios.put("http://10.0.0.3:3000/changehint", {
          hint: input.Hint,
        });
      }
    }
    if (input.OldPassword && input.NewPassword)
      if (input.ConfirmNewPassword === input.NewPassword) {
        axios.post("http://10.0.0.3:3000/changepass", {
          OldPassword: input.OldPassword,
          NewPassword: input.NewPassword,
        });
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
    <View>
      <TouchableOpacity onPress={changeusername}>
        <Text>
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}Change Username
        </Text>
      </TouchableOpacity>
      {username && (
        <>
          {" "}
          <Text style={styles.fieldname}>New Username</Text>
          <TextInput
            style={styles.fieldinput}
            onChangeText={(text) =>
              handleInput({ value: text, name: "Username" })
            }
            placeholder="New Username"
            placeholderTextColor="#ffffff"
          />
        </>
      )}
      <TouchableOpacity onPress={changehint}>
        <Text>Change Hint</Text>
      </TouchableOpacity>
      {hint && (
        <>
          {" "}
          <Text style={styles.fieldname}>New Hint</Text>
          <TextInput
            style={styles.fieldinput}
            onChangeText={(text) => handleInput({ value: text, name: "Hint" })}
            placeholder="New Hint"
            placeholderTextColor="#ffffff"
          />
        </>
      )}

      <TouchableOpacity onPress={changepassword}>
        <Text>Change Password</Text>
      </TouchableOpacity>
      {password && (
        <>
          {" "}
          <Text style={styles.fieldname}>Old Password</Text>
          <TextInput
            style={styles.fieldinput}
            onChangeText={(text) =>
              handleInput({ value: text, name: "OldPassword" })
            }
            placeholder="Old Password"
            placeholderTextColor="#ffffff"
          />
          <Text style={styles.fieldname}>New Password</Text>
          <TextInput
            style={styles.fieldinput}
            onChangeText={(text) =>
              handleInput({ value: text, name: "NewPassword" })
            }
            placeholder="New Password"
            placeholderTextColor="#ffffff"
          />
          <Text style={styles.fieldname}>Confirm New Password</Text>
          <TextInput
            style={styles.fieldinput}
            onChangeText={(text) =>
              handleInput({ value: text, name: "ConfirmNewPassword" })
            }
            placeholder="Confirm New Password"
            placeholderTextColor="#ffffff"
          />
        </>
      )}
      <TouchableOpacity onPress={changeCreds}>
        <Text>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}

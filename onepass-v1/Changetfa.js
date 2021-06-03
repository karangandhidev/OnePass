import React, { useEffect, useState } from "react";
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
export default function Changetfa({ navigation }) {
  const [tfa, setTfa] = useState(false);
  const [input, setInput] = useState([]);
  const styles = StyleSheet.create(newcss);
  const [isLoaded] = useFonts(fonts);

  useEffect(() => {
    axios
      .get("http://10.0.0.7:3000/questions")
      .then((res) => {
        setInput(res.data);
      })
      .catch((e) => console.log(e));
  }, [setInput]);

  const changeQuestions = () => {
    input.map((i) => {
      axios.put("http://10.0.0.7:3000/questions", i).then(() => {
        console.log(i);
      });
      navigation.navigate("Login");
    });
  };

  const addPass = (text) => {
    for (let i = 0; i < 3; i++) {
      let array = input;
      array[i]["password"] = text;
      setInput(array);
    }
  };

  console.log(input);
  const render = (obj, index) => {
    const handleInput = (text, key, i) => {
      let array = input;
      array[i][key] = text;
      setInput(array);
    };

    return (
      <View key={index}>
        <TextInput
          style={styles.credentialsinput}
          onChangeText={(text) => handleInput(text, "question", index)}
          defaultValue={obj.question}
          placeholder="question 2"
          placeholderTextColor="#000000"
        />
        <Text>
          {"\n"}
          {"\n"}
          {"\n"}
        </Text>
        <TextInput
          style={styles.credentialsinput}
          defaultValue={obj.answer}
          onChangeText={(text) => handleInput(text, "answer", index)}
          placeholder="Answer 2"
          placeholderTextColor="#000000"
        />
        <Text>
          {"\n"}
          {"\n"}
          {"\n"}
        </Text>
      </View>
    );
  };

  const changetfa = () => {
    setTfa(!tfa);
    console.log(tfa);
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
        <Text style={styles.formheading}>Change 2FA</Text>
      </View>
      {tfa ? (
        <View style={styles.popupbox}>
          <View style={styles.popupboxtext}>
            <Text style={styles.popuptitle}>Confirmation</Text>
            <Text style={styles.popupcontent}>
              Enter password to confirm update
            </Text>
            <TextInput
              style={styles.credentialsinput}
              onChangeText={(text) => addPass(text)}
              placeholder="Password"
              placeholderTextColor="#000000"
            />
          </View>

          <View style={styles.popupbuttonbox}>
            <TouchableOpacity
              onPress={changetfa}
              style={styles.popupLeftbutton}
            >
              <Text style={styles.popupbuttoncontent}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={changeQuestions}
              style={styles.popupRightbutton}
            >
              <Text style={styles.popupbuttoncontent}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ScrollView style={styles.scroll}>
          <View style={styles.credentialsview}>
            {input.map(render)}

            <View style={styles.deletebuttonview}>
              <Text>
                {"\n"}
                {"\n"} {"\n"}
                {"\n"}
              </Text>
              <TouchableOpacity style={styles.submitdata} onPress={changetfa}>
                <Text style={styles.submitdatatext}>Update</Text>
              </TouchableOpacity>
            </View>
            <Text>
              {"\n"}
              {"\n"}
              {"\n"}
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

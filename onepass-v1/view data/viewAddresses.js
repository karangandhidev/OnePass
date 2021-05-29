import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import axios from "react-native-axios";
import { newcss } from "../newcss";
import { fonts } from "../fonts";
import Icons from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import AppLoading from "expo-app-loading";
export default function viewaddresses({ navigation }) {
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(newcss);
  const [editable, setEditable] = useState(false);
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

  const changeState = () => {
    setEditable(!editable);
    setdelete(!deleteable);
    if (editable) {
      navigation.navigate("Addresses");
    }
  };
  const del = () => {
    axios
      .delete(`http://10.0.0.9:3000/address/${data._id}`, data, {
        headers: {
          "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Authorization",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS",
        },
      })
      .then(navigation.navigate("Homepage"));
  };
  const submit = () => {
    axios
      .put(`http://10.0.0.9:3000/address/${data._id}`, data, {
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
      <View style={styles.background}>
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
                name={"arrow-back"}
                size={30}
                color="#F0F5F9"
                style={styles.editbackicon}
              />
              <TouchableOpacity style={styles.editbutton} onPress={changeState}>
                <Text style={styles.editbuttontext}>Edit</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.cancelbutton}
                onPress={changeState}
              >
                <Text style={styles.cancelbuttontext}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.submitbutton} onPress={submit}>
                <Text style={styles.submitbuttontext}>Submit</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <ScrollView style={styles.scroll}>
          <View style={([styles.screenview], { alignItems: "flex-start" })}>
            <Text style={styles.fieldname}>{"\n"}Name</Text>
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
            <Text style={styles.fieldname}>{"\n"}Apartment/Flat</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "apartment" })
              }
              defaultValue={data.apartment}
              editable={editable}
              placeholder="Aparthment / Flat"
              placeholderTextColor="#000000"
            />
            <Text style={styles.fieldname}>{"\n"}Street</Text>
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
            <Text style={styles.fieldname}>{"\n"}Landmark</Text>
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
            <Text style={styles.fieldname}>{"\n"}City</Text>
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
            <Text style={styles.fieldname}>{"\n"}State</Text>
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
            <Text style={styles.fieldname}>{"\n"}Country</Text>
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
            <Text style={styles.fieldname}>{"\n"}Pin-Code</Text>
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
            <View style={styles.deletebuttonview}>
              <Text>
                {"\n"}
                {"\n"}
              </Text>
              {deleteable ? null : (
                <>
                  <TouchableOpacity style={styles.deletebutton} onPress={del}>
                    <Text style={styles.deletebuttontext}>Delete</Text>
                  </TouchableOpacity>
                </>
              )}
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
}

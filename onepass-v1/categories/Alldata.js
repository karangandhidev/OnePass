import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import axios from "react-native-axios";
import { css } from "../css";
import { fonts } from "../fonts";
import Icons from "react-native-vector-icons/MaterialIcons";
import { store } from "../Redux/globalReducer";
import AppLoading from "expo-app-loading";
import { ScrollView } from "react-native-gesture-handler";

export default function Alldata({ navigation }) {
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(css);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchbar, setSearchbar] = useState(false);
  const [filtereddata, setFilter] = useState([]);
  const searchnow = () => {
    setSearchbar(!searchbar);
  };
  useEffect(() => {
    const getData = async () => {
      const token = store.getState().reducer.user.data;
      await axios
        .get("http://10.0.0.2:3000/alldata", { headers: { Auth: token } })
        .then((res) => {
          setData(res.data);
        });
    };
    getData();
  }, [setData]);

  useEffect(() => {
    setFilter(
      data.filter((obj) => {
        if (obj.city) {
          return (
            obj.city.toLowerCase().includes(search.toLowerCase()) ||
            obj.name.toLowerCase().includes(search.toLowerCase())
          );
        }

        if (obj.bank_name) {
          return obj.bank_name.toLowerCase().includes(search.toLowerCase());
        }
        if (obj.topic) {
          return obj.topic.toLowerCase().includes(search.toLowerCase());
        }
        if (obj.username) {
          return (
            obj.username.toLowerCase().includes(search.toLowerCase()) ||
            obj.name.toLowerCase().includes(search.toLowerCase())
          );
        }
        if (obj.moe) {
          return (
            obj.bankname.toLowerCase().includes(search.toLowerCase()) ||
            obj.name.toLowerCase().includes(search.toLowerCase())
          );
        }
      })
    );
  }, [search, data, setFilter]);

  const onPressHandler = (key) => (event) => {
    if (key.city) {
      navigation.navigate("viewAddress", { key });
    } else if (key.bank_name) {
      navigation.navigate("viewBank", { key });
    } else if (key.topic) {
      navigation.navigate("viewNotes", { key });
    } else if (key.username) {
      navigation.navigate("viewPassword", { key });
    } else if (key.moe) {
      navigation.navigate("viewCards", { key });
    }

    // navigation.navigate('viewAddress',{ key })
  };
  const render = (e) => {
    if (e.city) {
      return (
        <TouchableOpacity
          key={e._id}
          style={styles.datacard}
          onPress={onPressHandler(e)}
        >
          <Text style={styles.datacardtext}>{e.name}</Text>
          <Text style={styles.datacardtext}>{e.city}</Text>
        </TouchableOpacity>
      );
    } else if (e.bank_name) {
      return (
        <TouchableOpacity
          key={e._id}
          style={styles.datacard}
          onPress={onPressHandler(e)}
        >
          <Text style={styles.datacardtext}>{e.bank_name}</Text>
        </TouchableOpacity>
      );
    } else if (e.topic) {
      return (
        <TouchableOpacity
          key={e._id}
          style={styles.datacard}
          onPress={onPressHandler(e)}
        >
          <Text style={styles.datacardtext}>{e.topic}</Text>
        </TouchableOpacity>
      );
    } else if (e.username) {
      return (
        <TouchableOpacity
          key={e._id}
          style={styles.datacard}
          onPress={onPressHandler(e)}
        >
          <Text style={styles.datacardtext}>{e.name}</Text>
          <Text style={styles.datacardtext}>{e.email}</Text>
        </TouchableOpacity>
      );
    } else if (e.moe) {
      return (
        <TouchableOpacity
          key={e._id}
          style={styles.datacard}
          onPress={onPressHandler(e)}
        >
          <Text style={styles.datacardtext}>{e.bankname}</Text>
          <Text style={styles.datacardtext}>{e.name}</Text>
        </TouchableOpacity>
      );
    }
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

        <View style={styles.background}>
          <View style={styles.view_headerbg}>
            <Text style={styles.fakeheading}></Text>
          </View>
          <View style={styles.view_headingview}>
            {!searchbar ? (
              <>
                <Text style={styles.view_headingtext}>All Data</Text>
              </>
            ) : (
              <Text style={styles.view_headingtext}></Text>
            )}
          </View>

          <View style={styles.view_actualheading}>
            {!searchbar ? (
              <>
                <Icons
                  onPress={() => navigation.goBack()}
                  name={"chevron-left"}
                  size={50}
                  color="#F0F5F9"
                  style={styles.editbackicon}
                />
                <Icons
                  onPress={searchnow}
                  name={"search"}
                  size={45}
                  color="#F0F5F9"
                  style={styles.searchicon}
                />
              </>
            ) : (
              <>
                <TextInput
                  style={styles.searchbar}
                  onChangeText={(text) => setSearch(text)}
                  placeholder="Search"
                  placeholderTextColor="#000000"
                />
                <Icons
                  onPress={searchnow}
                  name={"close"}
                  size={50}
                  color="#F0F5F9"
                  style={styles.cancelsearchicon}
                />
              </>
            )}
          </View>

          <ScrollView style={styles.scroll}>
            <View style={styles.screenview}>
              {data.length > 0 ? (
                filtereddata.map(render)
              ) : (
                <Text style={styles.nodata}>No data available</Text>
              )}
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

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
export default function Notes({ navigation }) {
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(css);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [searchbar, setSearchbar] = useState(false);

  const searchnow = () => {
    setSearchbar(!searchbar);
  };
  useEffect(() => {
    const getData = async () => {
      const token = store.getState().reducer.user.data;
      await axios
        .get("http://10.0.0.2:3000/notesview", { headers: { Auth: token } })
        .then((res) => {
          setData(res.data);
        });
    };
    getData();
  }, [setData]);

  useEffect(() => {
    setFilter(
      data.filter((obj) =>
        obj.topic.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data, setFilter]);

  const onPressHandler = (key) => (event) => {
    navigation.navigate("viewNotes", { key });
  };

  const render = (e) => {
    return (
      <TouchableOpacity
        key={e._id}
        style={styles.datacard}
        onPress={onPressHandler(e)}
      >
        <Text style={styles.datacardtext}>{e.topic}</Text>
      </TouchableOpacity>
    );
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
                <Text style={styles.view_headingtext}>Notes</Text>
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
                filter.map(render)
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

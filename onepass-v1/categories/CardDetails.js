import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import axios from "react-native-axios";
import { newcss } from "../newcss";
import { fonts } from "../fonts";
import Icons from "react-native-vector-icons/MaterialIcons";
import { store } from "../Redux/globalReducer";
import AppLoading from "expo-app-loading";
import { ScrollView } from "react-native-gesture-handler";
export default function CardDetails({ navigation }) {
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(newcss);
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
        .get("http://10.0.0.9:3000/cards", { headers: { Auth: token } })
        .then((res) => {
          setData(res.data);
        });
    };
    getData();
  }, [setData]);
  useEffect(() => {
    setFilter(
      data.filter(
        (obj) =>
          obj.name.toLowerCase().includes(search.toLowerCase()) ||
          obj.bankname.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data, setFilter]);
  const onPressHandler = (key) => (event) => {
    navigation.navigate("viewCards", { key });
  };
  const render = (e) => {
    return (
      <TouchableOpacity
        key={e._id}
        onPress={onPressHandler(e)}
        style={styles.datacard}
      >
        <Text style={styles.datacardtext}>{e.name}</Text>
        <Text style={styles.datacardtext}>{e.bankname}</Text>
      </TouchableOpacity>
    );
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
          {!searchbar ? (
            <>
              <Text style={styles.view_headingtext}>Card Detail</Text>
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
                name={"arrow-back"}
                size={30}
                color="#F0F5F9"
                style={styles.editbackicon}
              />
              <Icons
                onPress={searchnow}
                name={"search"}
                size={30}
                color="#F0F5F9"
                style={styles.searchicon}
              />
            </>
          ) : (
            <>
              <View style={styles.searchcancel}>
                <TextInput
                  style={styles.searchbar}
                  onChangeText={(text) => setSearch(text)}
                  placeholder="Search"
                  placeholderTextColor="#000000"
                />
                <Icons
                  onPress={searchnow}
                  name={"close"}
                  size={30}
                  color="#F0F5F9"
                  style={styles.editbackicon}
                />
              </View>
            </>
          )}
        </View>

        <ScrollView style={styles.scroll}>
          <View style={styles.screenview}>
            {data.length > 0 ? (
              filter.map(render)
            ) : (
              <Text style={styles.carddata}>No data available</Text>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

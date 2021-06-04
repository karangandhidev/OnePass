import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import React, { useState, useEffect } from "react";
import AppLoading from "expo-app-loading";
import axios from "react-native-axios";
import { useDispatch } from "react-redux";
import Modal from "react-native-root-modal";
import { newcss } from "../newcss";
import { fonts } from "../fonts";
import { ScrollView } from "react-native-gesture-handler";
import { createStackNavigator } from "react-navigation-stack";
import Alldata from "./Alldata";
import Addresses from "./Addresses";
import BankDetails from "./BankDetails";
import CardDetails from "./CardDetails";
import Notes from "./Notes";
import Passwords from "./Passwords";
import Passform from "../forms/formPasswords";
import Addressform from "../forms/formAddresses";
import Cardsform from "../forms/formCardDetails";
import Bankform from "../forms/formBank";
import Notesform from "../forms/formNotes";
import Passview from "../view data/viewPasswords";
import Addressview from "../view data/viewAddresses";
import Cardsview from "../view data/viewCards";
import Bankview from "../view data/viewBank";
import Notesview from "../view data/viewNotes";
import AddButton from "../AddButton";
export default createStackNavigator({
  Homepage: {
    screen: Homepage,
    navigationOptions: {
      headerShown: false,
    },
  },

  Alldata: {
    screen: Alldata,
    navigationOptions: {
      headerShown: false,
    },
  },
  Addresses: {
    screen: Addresses,
    navigationOptions: {
      headerShown: false,
    },
  },
  BankDetails: {
    screen: BankDetails,
    navigationOptions: {
      headerShown: false,
    },
  },
  CardDetails: {
    screen: CardDetails,
    navigationOptions: {
      headerShown: false,
    },
  },
  Notes: {
    screen: Notes,
    navigationOptions: {
      headerShown: false,
    },
  },
  Passwords: {
    screen: Passwords,
    navigationOptions: {
      headerShown: false,
    },
  },

  formPasswords: {
    screen: Passform,
    navigationOptions: {
      headerShown: false,
    },
  },
  formAddress: {
    screen: Addressform,
    navigationOptions: {
      headerShown: false,
    },
  },
  formBank: {
    screen: Bankform,
    navigationOptions: {
      headerShown: false,
    },
  },
  formNotes: {
    screen: Notesform,
    navigationOptions: {
      headerShown: false,
    },
  },
  formCards: {
    screen: Cardsform,
    navigationOptions: {
      headerShown: false,
    },
  },
  viewPassword: {
    screen: Passview,
    navigationOptions: {
      headerShown: false,
    },
  },
  viewBank: {
    screen: Bankview,
    navigationOptions: {
      headerShown: false,
    },
  },
  viewAddress: {
    screen: Addressview,
    navigationOptions: {
      headerShown: false,
    },
  },
  viewCards: {
    screen: Cardsview,
    navigationOptions: {
      headerShown: false,
    },
  },
  viewNotes: {
    screen: Notesview,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export function Homepage({ navigation }) {
  const dispatch = useDispatch();
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(newcss);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    axios
      .get("http://10.0.0.3:3000/preference")
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "GETPREFERENCE", data: res.data });
      })
      .catch((e) => console.log(e));
  }, [dispatch]);

  const visis = () => {
    setVisible(!visible);
  };
  console.log(visible);
  if (!isLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.background}>
        <View style={styles.header}>
          <Text style={styles.fakeheading}></Text>
          <TouchableOpacity style={styles.addbutton} onPress={visis}>
            <Text style={styles.addbuttontext}>Add Data</Text>
          </TouchableOpacity>
          <Modal visible={visible}>
            <View style={styles.overlay}>
              <TouchableOpacity
                style={styles.overlaycard}
                onPress={() => {
                  navigation.navigate("formPasswords");
                }}
                onPressOut={visis}
              >
                <Text style={styles.overlaytext}>Passwords</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.overlaycard}
                onPress={() => {
                  navigation.navigate("formNotes");
                }}
                onPressOut={visis}
              >
                <Text style={styles.overlaytext}>Notes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.overlaycard}
                onPress={() => {
                  navigation.navigate("formAddress");
                }}
                onPressOut={visis}
              >
                <Text style={styles.overlaytext}>Addresses</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.overlaycard}
                onPress={() => {
                  navigation.navigate("formCards");
                }}
                onPressOut={visis}
              >
                <Text style={styles.overlaytext}>Card Details</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.overlaycard}
                onPress={() => {
                  navigation.navigate("formBank");
                }}
                onPressOut={visis}
              >
                <Text style={styles.overlaytext}>Bank Details</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        <View style={styles.textheading}>
          <Text style={styles.heading}>OnePass</Text>
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.screenview}>
            <TouchableOpacity
              style={styles.datacard}
              onPress={() => {
                navigation.navigate("Alldata");
              }}
            >
              <Text style={styles.datacardtext}>All Data</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.datacard}
              onPress={() => {
                navigation.navigate("Passwords");
              }}
            >
              <Text style={styles.datacardtext}>Passwords</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.datacard}
              onPress={() => {
                navigation.navigate("Notes");
              }}
            >
              <Text style={styles.datacardtext}>Notes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.datacard}
              onPress={() => {
                navigation.navigate("Addresses");
              }}
            >
              <Text style={styles.datacardtext}>Addresses</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.datacard}
              onPress={() => {
                navigation.navigate("CardDetails");
              }}
            >
              <Text style={styles.datacardtext}>Card Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.datacard}
              onPress={() => {
                navigation.navigate("BankDetails");
              }}
            >
              <Text style={styles.datacardtext}>Bank Details</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

import Icons from "react-native-vector-icons/MaterialIcons";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useFonts } from "expo-font";
import React, { useState, useEffect } from "react";
import AppLoading from "expo-app-loading";
import axios from "react-native-axios";
import { useDispatch, useSelector } from "react-redux";
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
import ChangePassword from "../ChangePassword";
// import Changetfa from "../Changetfa";
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
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: {
      headerShown: false,
    },
  },
  // Changetfa: {
  //   screen: Changetfa,
  //   navigationOptions: {
  //     headerShown: false,
  //   },
  // },
});

export function Homepage({ navigation }) {
  const dispatch = useDispatch();
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(newcss);
  const [visible, setVisible] = useState(false);

  const jwt = useSelector((state) => state.reducer.user);
  useEffect(() => {
    axios
      .get("http://10.0.0.7:3000/preference")
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "GETPREFERENCE", data: res.data });
      })
      .catch((e) => console.log(e));
  }, [dispatch]);

  const visis = () => {
    setVisible(!visible);
  };

  if (!isLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.background}>
        <StatusBar barStyle="light-content" backgroundColor="#1E2022" />
        {visible ? (
          <View style={styles.overlay}>
            <TouchableOpacity
              style={styles.overlaycard}
              onPress={() => {
                visis();
                navigation.navigate("formPasswords");
              }}
            >
              <Text style={styles.overlaytext}>Passwords</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.overlaycard}
              onPress={() => {
                visis();
                navigation.navigate("formNotes");
              }}
            >
              <Text style={styles.overlaytext}>Notes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.overlaycard}
              onPress={() => {
                visis();
                navigation.navigate("formAddress");
              }}
            >
              <Text style={styles.overlaytext}>Addresses</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.overlaycard}
              onPress={() => {
                visis();
                navigation.navigate("formCards");
              }}
            >
              <Text style={styles.overlaytext}>Card Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.overlaycard}
              onPress={() => {
                visis();
                navigation.navigate("formBank");
              }}
            >
              <Text style={styles.overlaytext}>Bank Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.overlaycard} onPress={visis}>
              <Icons onPress={visis} name={"close"} size={30} color="#000000" />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.fakeheading}></Text>
              <TouchableOpacity style={styles.addbutton} onPress={visis}>
                <Text style={styles.addbuttontext}>Add Data</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.textheading}>
              <Text style={styles.heading}>OnePass</Text>
            </View>
          </>
        )}

        <ScrollView style={styles.scroll}>
          <View style={styles.screenview}>
            <TouchableOpacity
              style={[
                styles.datacard,
                {
                  marginTop: 25,
                },
              ]}
              onPress={() => {
                navigation.navigate("Alldata");
              }}
            >
              <Icons name={"public"} size={40} color="#F0F5F9" />
              <Text style={styles.datacardtext}>All Data</Text>
              <Icons name={"chevron-right"} size={50} color="#F0F5F9" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.datacard}
              onPress={() => {
                navigation.navigate("Passwords");
              }}
            >
              <Icons name={"language"} size={40} color="#F0F5F9" />
              <Text style={styles.datacardtext}>Passwords</Text>
              <Icons name={"chevron-right"} size={50} color="#F0F5F9" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.datacard}
              onPress={() => {
                navigation.navigate("Notes");
              }}
            >
              <Icons name={"description"} size={40} color="#F0F5F9" />
              <Text style={styles.datacardtext}>Notes</Text>
              <Icons name={"chevron-right"} size={50} color="#F0F5F9" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.datacard}
              onPress={() => {
                navigation.navigate("Addresses");
              }}
            >
              <Icons name={"apartment"} size={40} color="#F0F5F9" />
              <Text style={styles.datacardtext}>Addresses</Text>
              <Icons name={"chevron-right"} size={50} color="#F0F5F9" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.datacard}
              onPress={() => {
                navigation.navigate("CardDetails");
              }}
            >
              <Icons name={"payment"} size={40} color="#F0F5F9" />
              <Text style={styles.datacardtext}>Card Details</Text>
              <Icons name={"chevron-right"} size={50} color="#F0F5F9" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.datacard}
              onPress={() => {
                navigation.navigate("BankDetails");
              }}
            >
              <Icons name={"payments"} size={40} color="#F0F5F9" />
              <Text style={styles.datacardtext}>Bank Details</Text>
              <Icons name={"chevron-right"} size={50} color="#F0F5F9" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

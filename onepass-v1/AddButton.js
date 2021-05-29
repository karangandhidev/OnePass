import { FontAwesome5, Feather } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  Animated,
  TouchableOpacity,
} from "react-native";
import Passform from "./forms/formPasswords";

const deviceWindow = Dimensions.get("window");
const visis = () => {
  setVisible(!visible);
};
export default class AddButton extends React.Component {
  buttonSize = new Animated.Value(1);
  mode = new Animated.Value(0);

  handlePress = () => {
    Animated.sequence([
      Animated.timing(this.buttonSize, {
        toValue: 0.95,
        duration: 0,
      }),
      Animated.timing(this.buttonSize, {
        toValue: 1,
      }),
      Animated.timing(this.mode, {
        toValue: this.mode._value === 0 ? 1 : 0,
      }),
    ]).start();
  };

  render() {
    const sizeStyle = {
      transform: [{ scale: this.buttonSize }],
    };

    const rotation = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "45deg"],
    });

    const addOverlayX = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [deviceWindow.width * 0.28, deviceWindow.width * 0.22],
    });
    const addOverlayY = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [deviceWindow.height * 0.27, deviceWindow.height * -0.5],
    });

    return (
      <View styles={{ position: "absolute", alignItems: "center" }}>
        <Animated.View
          style={{ position: "absolute", left: addOverlayX, top: addOverlayY }}
        >
          <TouchableOpacity
            style={styles.overlaycard}
            onPress={() => {
              navigation.navigate("Passform");
            }}
            onPressOut={visis}
          >
            <Text>Add Passwords</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.overlaycard}
            onPress={() => {
              navigation.navigate("formNotes");
            }}
            onPressOut={visis}
          >
            <Text>Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.overlaycard}
            onPress={() => {
              navigation.navigate("formAddress");
            }}
            onPressOut={visis}
          >
            <Text>Addresses</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.overlaycard}
            onPress={() => {
              navigation.navigate("formCards");
            }}
            onPressOut={visis}
          >
            <Text>Card Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.overlaycard}
            onPress={() => {
              navigation.navigate("formBank");
            }}
            onPressOut={visis}
          >
            <Text>Bank Details</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.button, sizeStyle]}>
          <TouchableHighlight
            underlayColor="#7F58FF"
            onPress={this.handlePress}
          >
            <Animated.View style={{ transform: [{ rotate: rotation }] }}>
              <FontAwesome5 name="plus" size={24} color="white" />
            </Animated.View>
          </TouchableHighlight>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#7F58FF",
    alignItems: "center",
    justifyContent: "center",
    width: 72,
    height: 72,
    borderRadius: 36,
    position: "absolute",
    bottom: deviceWindow.height * 0.04,
    left: deviceWindow.width * 0.27,
    shadowColor: "#7F58FF",
    shadowRadius: 5,
    shadowOffset: { height: 10 },
    shadowOpacity: 0.3,
    borderWidth: 3,
    borderColor: "black",
  },
  overlaycard: {
    borderRadius: 7,
    width: deviceWindow.width * 0.28,
    height: deviceWindow.height * 0.05,
    margin: "6%",
    backgroundColor: "#c3ccea",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 10,
    justifyContent: "center",
    shadowOffset: { width: 1, height: 13 },
    borderWidth: 3,
    borderColor: "black",
  },
  categoryButton: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    width: deviceWindow.width * 0.5,
    height: deviceWindow.height * 0.5,
    // position:"absolute",
    // bottom:deviceWindow.height * 0.20,
    // left:deviceWindow.width * 0.04,
    shadowColor: "#7F58FF",
  },
});

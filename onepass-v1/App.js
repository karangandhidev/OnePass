import React from "react";
import { StyleSheet } from "react-native";
import Navigator from "./index";
import { Provider } from "react-redux";
import { store } from "./Redux/globalReducer";
import FlashMessage from "react-native-flash-message";

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
      <FlashMessage
        position="top"
        animated={true}
        autoHide={true}
        duration={2000}
      />
    </Provider>
  );
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1E2022',
//     alignItems: 'center',
//   }
// });

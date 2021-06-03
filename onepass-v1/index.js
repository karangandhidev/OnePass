import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Register from "./Register";
import Login from "./Login";
import Bottomnavbar from "./Bottomnavbar";
import Test from "./Test";
import Login2FA from "./Login2FA";
import Register2FA from "./Register2FA";
const screens = {
  // Test: {
  //   screen: Test,
  //   navigationOptions: {
  //     headerShown: false,
  //   },
  // },
  // Login: {
  //   screen: Login,
  //   navigationOptions: {
  //     headerShown: false,
  //   },
  // },
  // Login2FA: {
  //   screen: Login2FA,
  //   navigationOptions: {
  //     headerShown: false,
  //   },
  // },
  // Register: {
  //   screen: Register,
  //   navigationOptions: {
  //     headerShown: false,
  //   },
  // },

  // Register2FA: {
  //   screen: Register2FA,
  //   navigationOptions: {
  //     headerShown: false,
  //   },
  // },
  Bottomnavbar: {
    screen: Bottomnavbar,
    navigationOptions: {
      headerShown: false,
    },
  },
};

const Homestack = createStackNavigator(screens);
export default createAppContainer(Homestack);

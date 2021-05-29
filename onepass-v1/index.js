import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Register from "./Register";
import Login from "./Login";
import Bottomnavbar from "./Bottomnavbar";
// import AddButton from "./AddButton";
import ChangePassword from "./ChangePassword";
const screens = {
  // AddButton: {
  //   screen: AddButton,
  //   navigationOptions: {
  //     headerShown: false,
  //   },
  // },
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      headerShown: false,
    },
  },
  Bottomnavbar: {
    screen: Bottomnavbar,
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
};

const Homestack = createStackNavigator(screens);
export default createAppContainer(Homestack);

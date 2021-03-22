import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Register from './Register';
import Login from './Login';
import Homepage from './Homepage';
import Alldata from './categories/Alldata';
import Addresses from './categories/Addresses';
import BankDetails from './categories/BankDetails';
import CardDetails from './categories/CardDetails';
import Notes from './categories/Notes';
import Passwords from './categories/Passwords';
const screens={
  Login:{
    screen:Login,
    navigationOptions: {
      headerShown: false,
    }
  },
  Register:{
    screen:Register,
    navigationOptions: {
      headerShown: false,
    }
  },
  Homepage:{
    screen:Homepage,
    navigationOptions: {
      headerShown: false,
    }
  },
  Alldata:{
    screen:Alldata,
    navigationOptions:{
      headerShown:false,
    }
  },  
  Addresses:{
    screen:Addresses,
    navigationOptions:{
      headerShown:false,
    }
  },
  BankDetails:{
    screen:BankDetails,
    navigationOptions:{
      headerShown:false,
    }
  },
  CardDetails:{
    screen:CardDetails,
    navigationOptions:{
      headerShown:false,
    }
  },
  Notes:{
    screen:Notes,
    navigationOptions:{
      headerShown: false,
    }
  },
  Passwords:{
    screen:Passwords,
    navigationOptions:{
      headerShown:false,
    }
  },
}
const Homestack = createStackNavigator(screens);
export default createAppContainer(Homestack);

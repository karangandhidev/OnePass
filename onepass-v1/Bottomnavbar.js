import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import Generator from "./Generator";
import Profile from "./Profile";
import React from "react";
import Homepage from "./categories/index";
import { FontAwesome5 } from "@expo/vector-icons";

const bottomTabNavigator = createBottomTabNavigator(
  {
    Homepage: {
      screen: Homepage,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: () => (
          <FontAwesome5 name="warehouse" size={24} style={{ color: "white" }} />
        ),
      },
    },
    Generator: {
      screen: Generator,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: () => (
          <FontAwesome5
            name="shield-alt"
            size={28}
            style={{ color: "white" }}
          />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: () => (
          <FontAwesome5 name="user-alt" size={24} style={{ color: "white" }} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: 15,
        height: 60,
        borderTopWidth: -1,
        borderColor: "#1E2022",
        backgroundColor: "#1E2022",
      },
    },
  }
);
const AppContainer = createAppContainer(bottomTabNavigator);
export default AppContainer;

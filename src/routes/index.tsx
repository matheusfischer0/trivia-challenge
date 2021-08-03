// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import QuizScreen from "../screens/QuizScreen";
import ResultScreen from "../screens/ResultScreen";

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator headerMode="none" initialRouteName="Home">
        <Screen name="Home" component={HomeScreen} />
        <Screen name="QuizScreen" component={QuizScreen} />
        <Screen name="ResultScreen" component={ResultScreen} />
      </Navigator>
    </NavigationContainer>
  );
}

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Home } from "../screens";
// import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
    </Stack.Navigator>
  );
}

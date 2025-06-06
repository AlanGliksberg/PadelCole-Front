import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Login } from "../screens";
// import ForgotPassword from '../screens/ForgotPassword';

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      {/* <Stack.Screen name="Forgot" component={ForgotPassword} /> */}
    </Stack.Navigator>
  );
}

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Questonary, Welcome } from "../screens";
import { colors } from "../theme";

const Stack = createNativeStackNavigator();

export function SetPlayerStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: { backgroundColor: colors.background },
      }}
      screenLayout={(props) => {
        return (
          <SafeAreaView edges={["top", "left", "right", "bottom"]}>
            {props.children}
          </SafeAreaView>
        );
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Questonary" component={Questonary} />
    </Stack.Navigator>
  );
}

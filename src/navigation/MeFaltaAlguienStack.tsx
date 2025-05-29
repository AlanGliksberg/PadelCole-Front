import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { FALTA_ALGUIEN_PAGE_NAME } from "../constants/pages";
import { MeFaltaAlguien } from "../screens";
import { MeFaltaAlguienStackParamList } from "../types";

const Stack = createNativeStackNavigator<MeFaltaAlguienStackParamList>();

const MeFaltaAlguienStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="MeFaltaAlguien"
      component={MeFaltaAlguien}
      options={{ title: FALTA_ALGUIEN_PAGE_NAME }}
    />
    {/* <Stack.Screen
      name="CreateMatch"
      component={CreateMatch}
      options={{ title: 'Crear Partido' }}
    /> */}
  </Stack.Navigator>
);

export default MeFaltaAlguienStack;

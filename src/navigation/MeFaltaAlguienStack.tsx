import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { CustomScreen } from "../components";
import { FALTA_ALGUIEN_PAGE_NAME } from "../constants/pages";
import { MeFaltaAlguien } from "../screens";
import { MeFaltaAlguienStackParamList } from "../types";

const Stack = createNativeStackNavigator<MeFaltaAlguienStackParamList>();

const MeFaltaAlguienStack: React.FC = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    screenLayout={(props) => {
      return (
        <CustomScreen title={props.options.title!}>
          {props.children}
        </CustomScreen>
      );
    }}
  >
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

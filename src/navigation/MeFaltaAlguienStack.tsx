import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { CustomScreen } from "../components";
import {
  CREAR_PARTIDO_PAGE_NAME,
  EDITAR_PARTIDO_PAGE_NAME,
  FALTA_ALGUIEN_PAGE_NAME,
} from "../constants/pages";
import { CrearPartido, EditarPartido, MeFaltaAlguien } from "../screens";
import { MeFaltaAlguienStackParamList } from "../types";

const Stack = createNativeStackNavigator<MeFaltaAlguienStackParamList>();

const MeFaltaAlguienStack: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: "slide_from_right",
    }}
    screenLayout={(props) => {
      return (
        <CustomScreen
          title={props.options.title!}
          showBack={props.options.headerBackVisible}
        >
          {props.children}
        </CustomScreen>
      );
    }}
  >
    <Stack.Screen
      name="MeFaltaAlguien"
      component={MeFaltaAlguien}
      options={{
        title: FALTA_ALGUIEN_PAGE_NAME,
        headerBackVisible: false,
      }}
    />
    <Stack.Screen
      name="CrearPartido"
      component={CrearPartido}
      options={{ title: CREAR_PARTIDO_PAGE_NAME, headerBackVisible: true }}
    />
    <Stack.Screen
      name="EditarPartido"
      component={EditarPartido}
      options={{ title: EDITAR_PARTIDO_PAGE_NAME, headerBackVisible: true }}
    />
  </Stack.Navigator>
);

export default MeFaltaAlguienStack;

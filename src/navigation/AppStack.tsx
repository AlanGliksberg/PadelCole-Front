import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import {
  FALTA_ALGUIEN_PAGE_NAME,
  HOME_PAGE_NAME,
  PERFIL_PAGE_NAME,
  QUIERO_JUGAR_PAGE_NAME,
} from "../constants/pages";
import { Home, Perfil, QuieroJugar } from "../screens";
import { colors, typography } from "../theme";
import { AppStackParamList } from "../types";
import MeFaltaAlguienStack from "./MeFaltaAlguienStack";

const Tab = createBottomTabNavigator<AppStackParamList>();

export function AppStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: { fontSize: typography.xsmall },
        tabBarStyle: { backgroundColor: colors.white },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: HOME_PAGE_NAME,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="QuieroJugar"
        component={QuieroJugar}
        options={{
          title: QUIERO_JUGAR_PAGE_NAME,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="sports-tennis" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="MeFaltaAlguienStack"
        component={MeFaltaAlguienStack}
        options={{
          title: FALTA_ALGUIEN_PAGE_NAME,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="group-add" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="MiPerfil"
        component={Perfil}
        options={{
          title: PERFIL_PAGE_NAME,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

import { AuthProvider } from "@/src/contexts/AuthContext";
import RootNavigator from "@/src/navigation/RootNavigator";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="inverted" />
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

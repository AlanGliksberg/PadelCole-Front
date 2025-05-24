import { AuthProvider } from "@/src/contexts/AuthContext";
import { LoadingProvider } from "@/src/contexts/LoadingContext";
import RootNavigator from "@/src/navigation/RootNavigator";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="inverted" />
      <AuthProvider>
        <LoadingProvider>
          <RootNavigator />
        </LoadingProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

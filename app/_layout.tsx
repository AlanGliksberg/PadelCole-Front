import { AuthProvider } from "@/src/contexts/AuthContext";
import { LoadingProvider } from "@/src/contexts/LoadingContext";
import { ModalProvider } from "@/src/contexts/ModalContext";
import { PlayerModalsProvider } from "@/src/contexts/PlayerModalsContext";
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
        <PlayerModalsProvider>
          <ModalProvider>
            <LoadingProvider>
              <RootNavigator />
            </LoadingProvider>
          </ModalProvider>
        </PlayerModalsProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

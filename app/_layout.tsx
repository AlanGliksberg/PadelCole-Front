import { IOS_CLIENT_ID, WEB_CLIENT_ID } from "@/src/constants/auth";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { LoadingProvider } from "@/src/contexts/LoadingContext";
import { ModalProvider } from "@/src/contexts/ModalContext";
import { PlayerModalsProvider } from "@/src/contexts/PlayerModalsContext";
import RootNavigator from "@/src/navigation/RootNavigator";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: IOS_CLIENT_ID,
      webClientId: WEB_CLIENT_ID,
    });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="inverted" />
      <AuthProvider>
        <ModalProvider>
          <PlayerModalsProvider>
            <LoadingProvider>
              <RootNavigator />
            </LoadingProvider>
          </PlayerModalsProvider>
        </ModalProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

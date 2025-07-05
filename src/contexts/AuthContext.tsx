import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as SplashScreen from "expo-splash-screen";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { USER_TOKEN_SESSION_KEY } from "../constants/auth";
import { refreshToken as refreshTokenService } from "../services/auth";
import { clearCache } from "../services/cache";
import { JWTPayload } from "../types";
import { decodeToken } from "../utils/auth";

type AuthContextData = {
  token: string | null;
  saveToken: (jwt: string) => Promise<void>;
  logout: () => Promise<void>;
  user: JWTPayload | null;
  refreshToken: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextData>({
  token: null,
  saveToken: async () => {},
  logout: async () => {},
  user: null,
  refreshToken: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<JWTPayload | null>(null);
  console.log({ user });

  const storeToken = async (jwt: string | null) => {
    setToken(jwt);
    if (!jwt) return;

    await AsyncStorage.setItem(USER_TOKEN_SESSION_KEY, jwt);
    const decodedToken = decodeToken(jwt);
    setUser(decodedToken);
  };

  // Al montar, tratar de recuperar el token
  useEffect(() => {
    AsyncStorage.getItem(USER_TOKEN_SESSION_KEY).then(async (stored) => {
      if (stored) storeToken(stored);
      setTimeout(async () => await SplashScreen.hideAsync(), 1500);
    });
  }, []);

  const saveToken = async (jwt: string) => {
    clearCache();
    await GoogleSignin.signOut();

    storeToken(jwt);
  };

  const logout = async () => {
    await AsyncStorage.removeItem(USER_TOKEN_SESSION_KEY);
    storeToken(null);
  };

  const refreshToken = async () => {
    const res = await refreshTokenService(token!);
    if (res.error || !res?.data?.token)
      console.log("Error refreshing token", res.message);
    else storeToken(res.data.token);
  };

  return (
    <AuthContext.Provider
      value={{ token, saveToken, logout, user, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

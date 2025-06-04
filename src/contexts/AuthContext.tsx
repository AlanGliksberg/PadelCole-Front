import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { USER_TOKEN_SESSION_KEY } from "../constants/auth";
import { JWTPayload } from "../types";
import { decodeToken } from "../utils/auth";

type AuthContextData = {
  token: string | null;
  saveToken: (jwt: string) => Promise<void>;
  logout: () => Promise<void>;
  user: JWTPayload | null;
};

export const AuthContext = createContext<AuthContextData>({
  token: null,
  saveToken: async () => {},
  logout: async () => {},
  user: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<JWTPayload | null>(null);

  const storeToken = (jwt: string | null) => {
    setToken(jwt);
    if (!jwt) return;

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
    await AsyncStorage.setItem(USER_TOKEN_SESSION_KEY, jwt);
    storeToken(jwt);
  };

  const logout = async () => {
    await AsyncStorage.removeItem(USER_TOKEN_SESSION_KEY);
    storeToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

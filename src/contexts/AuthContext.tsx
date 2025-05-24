import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { USER_TOKEN_SESSION_KEY } from "../constants/constants";

type AuthContextData = {
  token: string | null;
  saveToken: (jwt: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextData>({
  token: null,
  saveToken: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  // Al montar, tratar de recuperar el token
  useEffect(() => {
    AsyncStorage.getItem(USER_TOKEN_SESSION_KEY).then(async (stored) => {
      if (stored) setToken(stored);
      setTimeout(async () => await SplashScreen.hideAsync(), 1500);
    });
  }, []);

  const saveToken = async (jwt: string) => {
    await AsyncStorage.setItem(USER_TOKEN_SESSION_KEY, jwt);
    setToken(jwt);
  };

  const logout = async () => {
    await AsyncStorage.removeItem(USER_TOKEN_SESSION_KEY);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

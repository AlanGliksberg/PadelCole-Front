import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";

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
    AsyncStorage.getItem("userToken").then((stored) => {
      if (stored) setToken(stored);
    });
  }, []);

  const saveToken = async (jwt: string) => {
    await AsyncStorage.setItem("userToken", jwt);
    setToken(jwt);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("userToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

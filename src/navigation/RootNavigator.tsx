// src/navigation/RootNavigator.tsx
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";

export default function RootNavigator() {
  const { token } = useContext(AuthContext);

  return <>{token ? <AppStack /> : <AuthStack />}</>;
}

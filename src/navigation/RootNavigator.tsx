// src/navigation/RootNavigator.tsx
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";
import { SetPlayerStack } from "./SetPlayerStack";

export default function RootNavigator() {
  const { token, user } = useContext(AuthContext);

  let PageToShow = <></>;
  if (token) {
    if (user?.playerId) {
      PageToShow = <AppStack />;
    } else {
      PageToShow = <SetPlayerStack />;
    }
  } else {
    PageToShow = <AuthStack />;
  }

  return <>{PageToShow}</>;
}

// app/index.tsx
import { Redirect } from "expo-router";
import React, { useContext } from "react";
import { AuthContext } from "../src/contexts/AuthContext";

export default function Index() {
  const { token } = useContext(AuthContext);

  return token ? <Redirect href="/home" /> : <Redirect href="/login" />;
}

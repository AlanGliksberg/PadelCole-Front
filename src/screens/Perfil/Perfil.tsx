import { AuthContext } from "@/src/contexts/AuthContext";
import React, { useContext } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./Perfil.styles";

export default function Perfil() {
  const { logout } = useContext(AuthContext);
  logout();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Bienvenido a Perfil</Text>
    </SafeAreaView>
  );
}

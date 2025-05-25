import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./Perfil.styles";

export default function Perfil() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Bienvenido a Perfil</Text>
    </SafeAreaView>
  );
}

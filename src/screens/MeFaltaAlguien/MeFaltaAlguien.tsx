import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./MeFaltaAlguien.styles";

export default function MeFaltaAlguien() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Bienvenido a MeFaltaAlguien</Text>
    </SafeAreaView>
  );
}

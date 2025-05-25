import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./QuieroJugar.styles";

export default function QuieroJugar() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Bienvenido a QuieroJugar</Text>
    </SafeAreaView>
  );
}

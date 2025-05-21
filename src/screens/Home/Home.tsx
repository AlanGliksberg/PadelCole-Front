import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./Home.styles";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Bienvenido a Home</Text>
    </SafeAreaView>
  );
}

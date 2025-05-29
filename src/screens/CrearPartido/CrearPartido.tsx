// src/screens/CreateMatch.tsx
import { CustomText } from "@/src/components";
import React from "react";
import { Button, View } from "react-native";
import { styles } from "./CrearPartido.styles";

const CrearPartido: React.FC = () => (
  <View style={styles.container}>
    <CustomText.Title>Crear Partido</CustomText.Title>
    <Button title="Guardar" onPress={() => {}} />
  </View>
);

export default CrearPartido;

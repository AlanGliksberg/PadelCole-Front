// src/screens/CreateMatch.tsx
import MatchForm from "@/src/components/MatchForm/MatchForm";
import React from "react";
import { ScrollView, View } from "react-native";
import { styles } from "./CrearPartido.styles";

const CrearPartido: React.FC = () => (
  <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <MatchForm onSubmit={() => {}} />
    </ScrollView>
  </View>
);

export default CrearPartido;

import React from "react";
import { View } from "react-native";
import CustomText from "@/src/components/ui/CustomText/CustomText";

const PartidosList: React.FC = () => {
  return (
    <View style={{ padding: 16 }}>
      <CustomText type="body" bold>
        Lista de Partidos (dummy)
      </CustomText>
      <CustomText type="body">- Partido 1</CustomText>
      <CustomText type="body">- Partido 2</CustomText>
      <CustomText type="body">- Partido 3</CustomText>
    </View>
  );
};

export default PartidosList;

import React from "react";
import { View } from "react-native";
import CustomText from "@/src/components/ui/CustomText/CustomText";

const PostulacionesList: React.FC = () => {
  return (
    <View style={{ padding: 16 }}>
      <CustomText type="body" bold>
        Lista de Postulaciones (dummy)
      </CustomText>
      <CustomText type="body">- Postulación 1</CustomText>
      <CustomText type="body">- Postulación 2</CustomText>
      <CustomText type="body">- Postulación 3</CustomText>
    </View>
  );
};

export default PostulacionesList;

import React from "react";
import { View, Linking } from "react-native";
import { CustomText } from "@/src/components";
import { APP_EMAIL } from "@/src/constants/config";
import { styles } from "./ContactInfo.styles";

export const ContactInfo: React.FC = () => {
  const handleEmailPress = () => {
    Linking.openURL(`mailto:${APP_EMAIL}`);
  };

  return (
    <View>
      <CustomText type="xsmall">
        Para consultas, sugerencias o reporte de errores envianos un mail a{" "}
        <CustomText
          type="xsmall"
          bold
          style={styles.emailLink}
          onPress={handleEmailPress}
        >
          {APP_EMAIL}
        </CustomText>
      </CustomText>
    </View>
  );
};

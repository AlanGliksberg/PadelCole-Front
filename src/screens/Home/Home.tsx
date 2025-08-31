import React from "react";
import { CustomScreen, CustomText, TabSelector } from "@/src/components";
import { HOME_PAGE_NAME } from "@/src/constants/pages";
import { View, Linking } from "react-native";
import { styles } from "./Home.styles";
import { APP_EMAIL } from "@/src/constants/config";
import MyMatches from "@/src/components/MyMatches/MyMatches";

const tabs = [
  { id: "partidos", label: "Mis partidos", component: <MyMatches /> },
  { id: "resultados", label: "Resultados", component: <></> },
];

export default function Home() {
  const handleEmailPress = () => {
    Linking.openURL(`mailto:${APP_EMAIL}`);
  };

  return (
    <CustomScreen title={HOME_PAGE_NAME}>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <TabSelector tabs={tabs} />
        </View>
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
      </View>
    </CustomScreen>
  );
}

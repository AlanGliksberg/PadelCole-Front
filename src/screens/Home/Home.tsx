import React, { useState } from "react";
import { CustomScreen, CustomText, TabSelector } from "@/src/components";
import { HOME_PAGE_NAME } from "@/src/constants/pages";
import { View, Linking } from "react-native";
import { styles } from "./Home.styles";
import { APP_EMAIL } from "@/src/constants/config";

type HomeTabType = "partidos" | "resultados";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<HomeTabType>("partidos");

  const tabs = [
    { id: "partidos", label: "Partidos" },
    { id: "resultados", label: "Resultados" },
  ] as const;

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${APP_EMAIL}`);
  };

  return (
    <CustomScreen title={HOME_PAGE_NAME}>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <TabSelector<HomeTabType>
            tabs={tabs}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
          />
          {selectedTab === "partidos" ? <></> : <></>}
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

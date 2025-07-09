import React from "react";
import { Text, Pressable, View } from "react-native";
import { styles } from "./MatchTabs.styles";
import CustomText from "../ui/CustomText/CustomText";

interface MatchTabsProps {
  selectedTab: "partidos" | "postulaciones";
  onTabChange: (tab: "partidos" | "postulaciones") => void;
}

export const MatchTabs: React.FC<MatchTabsProps> = ({
  selectedTab,
  onTabChange,
}) => (
  <View style={styles.container}>
    <Pressable
      onPress={() => onTabChange("partidos")}
      style={[styles.tab, selectedTab === "partidos" && styles.tabSelected]}
    >
      <CustomText
        style={[
          styles.tabText,
          selectedTab === "partidos" && styles.tabTextSelected,
        ]}
        type="body"
        bold
      >
        Partidos
      </CustomText>
    </Pressable>
    <View style={styles.divider} />
    <Pressable
      onPress={() => onTabChange("postulaciones")}
      style={[
        styles.tab,
        selectedTab === "postulaciones" && styles.tabSelected,
      ]}
    >
      <CustomText
        style={[
          styles.tabText,
          selectedTab === "postulaciones" && styles.tabTextSelected,
        ]}
        type="body"
        bold
      >
        Mis postulaciones
      </CustomText>
    </Pressable>
  </View>
);

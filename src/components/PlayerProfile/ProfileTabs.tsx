import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

import CustomText from "@/src/components/ui/CustomText/CustomText";
import { colors } from "@/src/theme";
import { Player } from "@/src/types/player/Player";
import { styles } from "./PlayerProfile.styles";
import PersonalInfo from "./PersonalInfo";
import MatchHistory from "./MatchHistory";
import Configuration from "./Configuration";

export type TabType = "personal" | "historial" | "configuracion";

interface ProfileTabsProps {
  player: Player | null;
  handleRefresh: () => void;
}

export default function ProfileTabs({
  player,
  handleRefresh,
}: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("personal");

  // TODO - usar loading
  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalInfo player={player} handleRefresh={handleRefresh} />;
      case "historial":
        return <MatchHistory />;
      case "configuracion":
        return <Configuration />;
      default:
        return <PersonalInfo player={player} handleRefresh={handleRefresh} />;
    }
  };

  return (
    <View style={styles.tabsSectionContainer}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "personal" && styles.activeTab]}
          onPress={() => setActiveTab("personal")}
        >
          <MaterialIcons
            name="person"
            size={20}
            color={
              activeTab === "personal" ? colors.primary : colors.description
            }
          />
          <CustomText
            style={[
              styles.tabText,
              activeTab === "personal" && styles.activeTabText,
            ]}
          >
            Personal
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "historial" && styles.activeTab]}
          onPress={() => setActiveTab("historial")}
        >
          <MaterialCommunityIcons
            name="history"
            size={20}
            color={
              activeTab === "historial" ? colors.primary : colors.description
            }
          />
          <CustomText
            style={[
              styles.tabText,
              activeTab === "historial" && styles.activeTabText,
            ]}
          >
            Historial
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "configuracion" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("configuracion")}
        >
          <MaterialIcons
            name="settings"
            size={20}
            color={
              activeTab === "configuracion"
                ? colors.primary
                : colors.description
            }
          />
          <CustomText
            style={[
              styles.tabText,
              activeTab === "configuracion" && styles.activeTabText,
            ]}
          >
            Configuración
          </CustomText>
        </TouchableOpacity>
      </View>

      {renderTabContent()}
    </View>
  );
}

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

import CustomText from "@/src/components/ui/CustomText/CustomText";
import { colors } from "@/src/theme";
import { Match } from "@/src/types/match/Match";
import { Player } from "@/src/types/player/Player";
import { styles } from "./PlayerProfile.styles";
import { Configuration, MatchHistory, PersonalInfo } from "./index";

export type TabType = "personal" | "historial" | "configuracion";

interface ProfileTabsProps {
  player: Player | null;
  matches: Match[];
  loading: boolean;
  onEditProfile: () => void;
  onLogout: () => void;
  onChangePassword: () => void;
}

export default function ProfileTabs({
  player,
  matches,
  loading,
  onEditProfile,
  onLogout,
  onChangePassword,
}: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("personal");

  // TODO - usar loading
  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalInfo player={player} onEditProfile={onEditProfile} />;
      case "historial":
        return <MatchHistory matches={matches} loading={loading} />;
      case "configuracion":
        return (
          <Configuration
            onLogout={onLogout}
            onChangePassword={onChangePassword}
          />
        );
      default:
        return <PersonalInfo player={player} onEditProfile={onEditProfile} />;
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

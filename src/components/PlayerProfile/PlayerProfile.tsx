import React, { useContext } from "react";
import { Alert, ScrollView, View } from "react-native";

import CustomText from "@/src/components/ui/CustomText/CustomText";
import { AuthContext } from "@/src/contexts/AuthContext";
import { PlayerModalsContext } from "@/src/contexts/PlayerModalsContext";
import { Match } from "@/src/types/match/Match";
import { Player } from "@/src/types/player/Player";
import { styles } from "./PlayerProfile.styles";
import { ProfileHeader, ProfileTabs } from "./index";

interface PlayerProfileProps {
  player: Player | null;
  matches: Match[];
  loading: boolean;
}

export default function PlayerProfile({
  player,
  matches,
  loading,
}: PlayerProfileProps) {
  const { logout } = useContext(AuthContext);
  const { openChangePasswordModal, openEditProfileModal } =
    useContext(PlayerModalsContext);

  const handleRefresh = async () => {
    // setRefreshing(true);
    // await onRefresh();
    // setRefreshing(false);
  };

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro que quieres cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Cerrar sesión", style: "destructive", onPress: logout },
    ]);
  };

  const handleEditProfile = () => {
    if (player) {
      openEditProfileModal(player, handleRefresh);
    }
  };

  const handleChangePassword = () => {
    openChangePasswordModal();
  };

  if (!player) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <CustomText>No se pudo cargar el perfil del jugador</CustomText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ProfileHeader
          player={player}
          matches={matches}
          onEditProfile={handleEditProfile}
        />

        <ProfileTabs
          player={player}
          matches={matches}
          loading={loading}
          onEditProfile={handleEditProfile}
          onLogout={handleLogout}
          onChangePassword={handleChangePassword}
        />
      </ScrollView>
    </View>
  );
}

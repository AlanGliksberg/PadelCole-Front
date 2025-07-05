import React, { useCallback, useContext, useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";

import CustomText from "@/src/components/ui/CustomText/CustomText";
import { AuthContext } from "@/src/contexts/AuthContext";
import { PlayerModalsContext } from "@/src/contexts/PlayerModalsContext";
import { getCreatedMatches, getMatchesCount } from "@/src/services/match";
import { getCurrentPlayer } from "@/src/services/player";
import { Match } from "@/src/types/match/Match";
import { Player } from "@/src/types/player/Player";
import { styles } from "./PlayerProfile.styles";
import { ProfileHeader, ProfileTabs } from "./index";
import { removeGetCurrentPlayerCache } from "@/src/services/cache";
import { LoadingContext } from "@/src/contexts/LoadingContext";

interface PlayerProfileProps {
  playerId: number;
}

export default function PlayerProfile({ playerId }: PlayerProfileProps) {
  const { logout } = useContext(AuthContext);
  const { openChangePasswordModal } = useContext(PlayerModalsContext);

  const [player, setPlayer] = useState<Player | null>(null);
  const { hideLoading, showLoading, loading } = useContext(LoadingContext);
  const [error, setError] = useState<string | null>(null);

  const loadPlayerData = useCallback(async () => {
    try {
      showLoading();
      setError(null);

      const playerResponse = await getCurrentPlayer();
      if (playerResponse.error || !playerResponse.data) {
        setError("Error al cargar los datos del jugador");
        return;
      }

      const foundPlayer = playerResponse.data.player;
      setPlayer(foundPlayer);
    } catch (err) {
      setError("Error al cargar los datos del jugador");
      console.error("Error loading player data:", err);
    } finally {
      hideLoading();
    }
  }, [hideLoading, showLoading]);

  useEffect(() => {
    loadPlayerData();
  }, [loadPlayerData, playerId]);

  const handleRefresh = async () => {
    removeGetCurrentPlayerCache();
    await loadPlayerData();
  };

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro que quieres cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Cerrar sesión", style: "destructive", onPress: logout },
    ]);
  };

  const handleChangePassword = () => {
    openChangePasswordModal();
  };

  if (loading) {
    return <></>;
  }

  // TODO - mejorar manejo de error y agregar loading
  if (error || !player) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <CustomText>
            {error || "No se pudo cargar el perfil del jugador"}
          </CustomText>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <ProfileHeader player={player} />

        <ProfileTabs
          player={player}
          handleRefresh={handleRefresh}
          onLogout={handleLogout}
          onChangePassword={handleChangePassword}
        />
      </View>
    </ScrollView>
  );
}

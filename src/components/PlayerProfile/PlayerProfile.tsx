import React, { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import CustomText from "@/src/components/ui/CustomText/CustomText";
import { getCurrentPlayer } from "@/src/services/player";
import { Player } from "@/src/types/player/Player";
import { styles } from "./PlayerProfile.styles";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import { removeGetCurrentPlayerCache } from "@/src/services/cache";
import { LoadingContext } from "@/src/contexts/LoadingContext";

interface PlayerProfileProps {
  playerId: number;
}

export default function PlayerProfile({ playerId }: PlayerProfileProps) {
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

  // TODO - mejorar manejo de error y agregar loading
  // considerar poder cerrar sesion si hay un error
  if (loading) {
    return <></>;
  }

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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ProfileHeader player={player} />
      <ProfileTabs player={player} handleRefresh={handleRefresh} />
    </ScrollView>
  );
}

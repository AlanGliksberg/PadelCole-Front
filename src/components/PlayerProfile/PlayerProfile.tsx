import React, { useContext, useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";

import CustomText from "@/src/components/ui/CustomText/CustomText";
import { AuthContext } from "@/src/contexts/AuthContext";
import { PlayerModalsContext } from "@/src/contexts/PlayerModalsContext";
import { getCreatedMatches } from "@/src/services/match";
import { getAllPlayers } from "@/src/services/player";
import { Match } from "@/src/types/match/Match";
import { Player } from "@/src/types/player/Player";
import { styles } from "./PlayerProfile.styles";
import { ProfileHeader, ProfileTabs } from "./index";

interface PlayerProfileProps {
  playerId: number;
}

export default function PlayerProfile({ playerId }: PlayerProfileProps) {
  const { logout } = useContext(AuthContext);
  const { openChangePasswordModal, openEditProfileModal } =
    useContext(PlayerModalsContext);

  const [player, setPlayer] = useState<Player | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPlayerData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Cargar datos del jugador
      const playersResponse = await getAllPlayers();
      if (playersResponse.error || !playersResponse.data) {
        setError("Error al cargar los datos del jugador");
        return;
      }

      const foundPlayer = playersResponse.data.players.find(
        (p: Player) => p.id === playerId
      );

      if (!foundPlayer) {
        setError("No se pudo encontrar el jugador");
        return;
      }

      setPlayer(foundPlayer);

      // Cargar partidos del jugador (por ahora usamos getCreatedMatches)
      const matchesResponse = await getCreatedMatches(1, 100);
      if (matchesResponse.error || !matchesResponse.data) {
        setMatches([]);
      } else {
        const playerMatches = matchesResponse.data.matches.filter(
          (match: Match) =>
            match.teams?.some((team) =>
              team.players?.some((p: Player) => p.id === playerId)
            )
        );
        setMatches(playerMatches);
      }
    } catch (err) {
      setError("Error al cargar los datos del jugador");
      console.error("Error loading player data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlayerData();
  }, [playerId]);

  const handleRefresh = async () => {
    // TODO - borrar cache
    await loadPlayerData();
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

  // TODO - mejorar manejo de error
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
        <ProfileHeader player={player} matches={matches} />

        <ProfileTabs
          player={player}
          matches={matches}
          loading={loading}
          onEditProfile={handleEditProfile}
          onLogout={handleLogout}
          onChangePassword={handleChangePassword}
        />
      </View>
    </ScrollView>
  );
}

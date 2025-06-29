import { PlayerProfile } from "@/src/components";
import CustomScreen from "@/src/components/ui/CustomScreen/CustomScreen";
import { PERFIL_PAGE_NAME } from "@/src/constants/pages";
import { AuthContext } from "@/src/contexts/AuthContext";
import { getCreatedMatches } from "@/src/services/match";
import { getAllPlayers } from "@/src/services/player";
import { Match } from "@/src/types/match/Match";
import { Player } from "@/src/types/player/Player";
import React, { useContext, useEffect, useState } from "react";

export default function Perfil() {
  const { user } = useContext(AuthContext);
  const [player, setPlayer] = useState<Player | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  console.log({ user });

  const loadProfileData = async () => {
    try {
      setLoading(true);

      // Cargar datos del jugador
      if (user?.playerId) {
        // Obtener todos los players y filtrar localmente
        const playerResponse = await getAllPlayers();

        if (!playerResponse.error && playerResponse.data) {
          const currentPlayer = playerResponse.data.players.find(
            (p) => p.id === user.playerId
          );
          setPlayer(currentPlayer || null);
        }
      }

      // Cargar historial de partidos
      const matchesResponse = await getCreatedMatches(1, 10, false);
      if (!matchesResponse.error && matchesResponse.data) {
        setMatches(matchesResponse.data.matches);
      }
    } catch (error) {
      console.error("Error loading profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, []);

  return (
    <CustomScreen title={PERFIL_PAGE_NAME}>
      <PlayerProfile player={player} matches={matches} loading={loading} />
    </CustomScreen>
  );
}

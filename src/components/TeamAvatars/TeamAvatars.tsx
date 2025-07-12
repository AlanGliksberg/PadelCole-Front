import { ModalContext } from "@/src/contexts/ModalContext";
import { addPlayerToMatch, deletePlayerFromMatch } from "@/src/services/match";
import { Match, Player } from "@/src/types";
import React, { useContext, useState } from "react";
import { View } from "react-native";
import PlayerAvatar from "../PlayerAvatar/PlayerAvatar";
import { styles } from "./TeamAvatars.styles";

interface TeamAvatarsProps {
  players: Player[];
  isCreator?: boolean;
  match?: Match;
  team?: number;
  callback?: () => Promise<void>;
  canDelete?: boolean;
}

const TeamAvatars: React.FC<TeamAvatarsProps> = ({
  players,
  isCreator = false,
  match,
  team,
  callback,
  canDelete,
}) => {
  const [playersState, setPlayersState] = useState<Player[]>(players);
  const { openModal, openErrorModal } = useContext(ModalContext);
  const addPlayer = (player: Player) => {
    openModal({
      title: "Agregar jugador",
      message: `¿Estás seguro que querés agregar al jugador ${player.firstName} ${player.lastName} al partido?`,
      primaryLabel: "Agregar",
      primaryAction: async () => {
        const result = await addPlayerToMatch(match!.id, team!, player.id);
        if (result.error) {
          if (result.code === 16) {
            openErrorModal(
              "Agregar jugador",
              "El jugador ya se encuentra en el partido"
            );
            return;
          } else {
            openErrorModal(
              "Agregar jugador",
              "Error agregando el jugador al partido"
            );
            return;
          }
        }
        setPlayersState((prev) => [...prev, player]);
        callback?.();
      },
    });
  };

  const removePlayer = (player: Player) => {
    openModal({
      title: "Eliminar jugador",
      message: `¿Estás seguro que querés eliminar al jugador ${player.firstName} ${player.lastName} del partido?`,
      primaryLabel: "Eliminar",
      primaryAction: async () => {
        const result = await deletePlayerFromMatch(match!.id, player.id);
        if (result.error) {
          openErrorModal("Eliminar jugador", "Error eliminando el jugador");
          return;
        }
        setPlayersState((prev) => prev.filter((p) => p.id !== player.id));
        callback?.();
      },
    });
  };

  return (
    <View style={styles.container}>
      {[0, 1].map((idx) => {
        const player = playersState[idx];
        return (
          <PlayerAvatar
            key={idx}
            player={player}
            size="s"
            isCreator={isCreator}
            match={match}
            team={team}
            addPlayerCallback={addPlayer}
            removeCallback={removePlayer}
            canDelete={canDelete}
          />
        );
      })}
    </View>
  );
};

export default TeamAvatars;

import { ModalContext } from "@/src/contexts/ModalContext";
import { addPlayerToMatch } from "@/src/services/match";
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
}

const TeamAvatars: React.FC<TeamAvatarsProps> = ({
  players,
  isCreator = false,
  match,
  team,
  callback,
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
          openErrorModal(
            "Agregar jugador",
            "Error agregando el jugador al partido"
          );
          return;
        }
        setPlayersState((prev) => [...prev, player]);
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
            callback={addPlayer}
          />
        );
      })}
    </View>
  );
};

export default TeamAvatars;

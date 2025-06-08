import { Match, Player } from "@/src/types";
import React, { useState } from "react";
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
  const addPlayer = (player: Player) => {
    setPlayersState((prev) => [...prev, player]);
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

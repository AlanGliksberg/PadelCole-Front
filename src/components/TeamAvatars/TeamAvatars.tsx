import { Player } from "@/src/types";
import React from "react";
import { View } from "react-native";
import PlayerAvatar from "../PlayerAvatar/PlayerAvatar";
import { styles } from "./TeamAvatars.styles";

interface TeamAvatarsProps {
  players: Player[];
  isCreator?: boolean;
}

const TeamAvatars: React.FC<TeamAvatarsProps> = ({
  players,
  isCreator = false,
}) => {
  return (
    <View style={styles.container}>
      {[0, 1].map((idx) => {
        const player = players[idx];
        return (
          <PlayerAvatar
            key={idx}
            player={player}
            size="s"
            isCreator={isCreator}
          />
        );
      })}
    </View>
  );
};

export default TeamAvatars;

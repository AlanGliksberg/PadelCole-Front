import { PlayerModalsContext } from "@/src/contexts/PlayerModalsContext";
import { Player } from "@/src/types";
import React, { useContext } from "react";
import { View } from "react-native";
import PlayerAvatar from "../PlayerAvatar/PlayerAvatar";
import { styles } from "./TeamAvatars.styles";

interface TeamAvatarsProps {
  players: Player[];
}

const TeamAvatars: React.FC<TeamAvatarsProps> = ({ players }) => {
  const { openPlayerDetail } = useContext(PlayerModalsContext);

  return (
    <View style={styles.container}>
      {[0, 1].map((idx) => {
        const player = players[idx];
        return (
          <PlayerAvatar
            key={idx}
            player={player}
            onPress={player ? () => openPlayerDetail(player) : () => {}}
            size="s"
          />
        );
      })}
    </View>
  );
};

export default TeamAvatars;

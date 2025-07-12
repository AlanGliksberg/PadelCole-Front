import { colors } from "@/src/theme";
import { Player } from "@/src/types/player/Player";
import { Team } from "@/src/types/player/Team";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import PlayerAvatar from "../PlayerAvatar/PlayerAvatar";
import CustomText from "../ui/CustomText/CustomText";
import { styles } from "./CourtDistribution.styles";

interface CourtDistributionProps {
  teams?: Team[];
  onPlayerAdd?: (
    player: Player,
    teamNumber: 1 | 2,
    playerIndex: number
  ) => void;
  onPlayerRemove?: (player: Player, teamNumber: 1 | 2) => void;
}

export default function CourtDistribution({
  teams = [],
  onPlayerAdd,
  onPlayerRemove,
}: CourtDistributionProps) {
  const team1 = teams.find((t) => t.teamNumber === 1);
  const team2 = teams.find((t) => t.teamNumber === 2);

  const renderTeamSide = (team: Team | undefined, teamNumber: 1 | 2) => {
    const players = team?.players || [];
    const maxPlayers = 2;

    return (
      <View style={styles.teamSide}>
        {Array.from({ length: maxPlayers }, (_, playerIndex) => {
          const player = players[playerIndex];

          const handlePlayerAdd = (selectedPlayer: Player) => {
            onPlayerAdd?.(selectedPlayer, teamNumber, playerIndex);
          };

          const handlePlayerRemove = (selectedPlayer: Player) => {
            onPlayerRemove?.(selectedPlayer, teamNumber);
          };

          return (
            <View key={playerIndex} style={styles.playerSlot}>
              <PlayerAvatar
                player={player}
                size="m"
                touchable
                isCreator
                addPlayerCallback={handlePlayerAdd}
                removeCallback={handlePlayerRemove}
              />
              {player && (
                <TouchableOpacity
                  onPress={() => onPlayerRemove?.(player, teamNumber)}
                  style={styles.closeButton}
                >
                  <MaterialIcons
                    name="close"
                    size={18}
                    color={colors.placeholder}
                  />
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelsContainer}>
        <CustomText type="small" style={styles.teamLabel} bold>
          Equipo 1
        </CustomText>
        <CustomText type="small" style={styles.teamLabel} bold>
          Equipo 2
        </CustomText>
      </View>
      <View style={styles.court}>
        {renderTeamSide(team1, 1)}
        <View style={styles.net} />
        {renderTeamSide(team2, 2)}
      </View>
    </View>
  );
}

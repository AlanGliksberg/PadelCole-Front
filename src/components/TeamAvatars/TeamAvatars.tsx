import { Player } from "@/src/types";
import { getPlayerInitials } from "@/src/utils/player";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import CustomText from "../ui/CustomText/CustomText";
import { styles } from "./TeamAvatars.styles";

interface TeamAvatarsProps {
  players: Player[];
}

const TeamAvatars: React.FC<TeamAvatarsProps> = ({ players }) => (
  <View style={styles.container}>
    {[0, 1].map((idx) => {
      const player = players[idx];
      return (
        <TouchableOpacity key={idx}>
          <View style={styles.avatar}>
            {player && player.user?.photoUrl ? (
              <Image
                source={{ uri: player.user.photoUrl }}
                style={styles.avatarImage}
              />
            ) : player ? (
              <CustomText style={styles.avatarText}>
                {getPlayerInitials(player.firstName, player.lastName)}
              </CustomText>
            ) : (
              <CustomText style={styles.avatarText}>+</CustomText>
            )}
          </View>
        </TouchableOpacity>
      );
    })}
  </View>
);

export default TeamAvatars;

import React, { useContext } from "react";
import { View } from "react-native";

import CustomText from "@/src/components/ui/CustomText/CustomText";
import { AuthContext } from "@/src/contexts/AuthContext";
import { Match } from "@/src/types/match/Match";
import { Player } from "@/src/types/player/Player";
import PlayerAvatar from "../PlayerAvatar/PlayerAvatar";
import { styles } from "./PlayerProfile.styles";

interface ProfileHeaderProps {
  player: Player | null;
  matches: Match[];
}

export default function ProfileHeader({ player, matches }: ProfileHeaderProps) {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        <PlayerAvatar player={player} size="xl" touchable={false} />
        {/* <TouchableOpacity style={styles.editAvatarButton} onPress={() => {}}>
          <MaterialIcons name="edit" size={16} color={colors.white} />
        </TouchableOpacity> */}
      </View>

      <View style={styles.profileInfo}>
        <CustomText style={styles.playerName}>
          {player?.firstName} {player?.lastName}
        </CustomText>
        <CustomText style={styles.playerEmail}>{user?.email}</CustomText>
        <View style={styles.playerStats}>
          <View style={styles.statItem}>
            <CustomText style={styles.statValue}>
              {player?.category?.description || "No informado"}
            </CustomText>
            <CustomText style={styles.statLabel}>Categoría</CustomText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <CustomText style={styles.statValue}>
              {player?.rankingPoints || 0}
            </CustomText>
            <CustomText style={styles.statLabel}>Puntos</CustomText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <CustomText style={styles.statValue}>{matches.length}</CustomText>
            <CustomText style={styles.statLabel}>Partidos</CustomText>
          </View>
        </View>
      </View>
    </View>
  );
}

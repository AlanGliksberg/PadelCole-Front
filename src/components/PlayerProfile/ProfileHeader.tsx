import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Image, TouchableOpacity, View } from "react-native";

import CustomText from "@/src/components/ui/CustomText/CustomText";
import { AuthContext } from "@/src/contexts/AuthContext";
import { colors } from "@/src/theme";
import { Match } from "@/src/types/match/Match";
import { Player } from "@/src/types/player/Player";
import { styles } from "./PlayerProfile.styles";

interface ProfileHeaderProps {
  player: Player | null;
  matches: Match[];
  onEditProfile: () => void;
}

export default function ProfileHeader({
  player,
  matches,
  onEditProfile,
}: ProfileHeaderProps) {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        {player?.user?.photoUrl ? (
          <Image source={{ uri: player.user.photoUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <MaterialIcons name="person" size={40} color={colors.placeholder} />
          </View>
        )}
        <TouchableOpacity
          style={styles.editAvatarButton}
          onPress={onEditProfile}
        >
          <MaterialIcons name="edit" size={16} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfo}>
        <CustomText style={styles.playerName}>
          {player?.firstName} {player?.lastName}
        </CustomText>
        <CustomText style={styles.playerEmail}>{user?.email}</CustomText>
        <View style={styles.playerStats}>
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

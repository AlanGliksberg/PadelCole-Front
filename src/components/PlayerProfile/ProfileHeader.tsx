import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import CustomText from "@/src/components/ui/CustomText/CustomText";
import { AuthContext } from "@/src/contexts/AuthContext";
import { Player } from "@/src/types/player/Player";
import PlayerAvatar from "../PlayerAvatar/PlayerAvatar";
import { styles } from "./PlayerProfile.styles";
import { getPlayedMatchesCount } from "@/src/services/match";
import { colors } from "@/src/theme";

interface ProfileHeaderProps {
  player: Player | null;
}

export default function ProfileHeader({ player }: ProfileHeaderProps) {
  const { user } = useContext(AuthContext);
  const [matchesCount, setMatchesCount] = useState<number | string>(0);
  const [loadingMatchesCount, setLoadingMatchesCount] = useState(false);

  useEffect(() => {
    const loadMatchesCount = async () => {
      setLoadingMatchesCount(true);
      const response = await getPlayedMatchesCount();
      if (!response.error && response.data) {
        setMatchesCount(response.data.count);
      } else {
        setMatchesCount("S/I");
      }
      setLoadingMatchesCount(false);
    };

    loadMatchesCount();
  }, []);

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
          {player?.firstName || "S/I"} {player?.lastName}
        </CustomText>
        <CustomText style={styles.playerEmail}>{user?.email}</CustomText>
        <View style={styles.playerStats}>
          <View style={styles.statItem}>
            <CustomText style={styles.statValue}>
              {player?.category?.description || "S/I"}
            </CustomText>
            <CustomText style={styles.statLabel}>Categoría</CustomText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <CustomText style={styles.statValue}>
              {player?.rankingPoints || "S/I"}
            </CustomText>
            <CustomText style={styles.statLabel}>Puntos</CustomText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <CustomText style={styles.statValue}>
              {loadingMatchesCount ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                matchesCount
              )}
            </CustomText>
            <CustomText style={styles.statLabel}>Partidos</CustomText>
          </View>
        </View>
      </View>
    </View>
  );
}

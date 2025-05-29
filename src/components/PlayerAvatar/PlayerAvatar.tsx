import { Player } from "@/src/types";
import { getPlayerInitials } from "@/src/utils/player";
import { Image, TouchableOpacity, View } from "react-native";
import { CustomText } from "..";
import { styles } from "./PlayerAvatar.styles";

type AvatarSize = "s" | "m" | "l";

interface PlayerAvatarProps {
  player: Player;
  onPress?: () => void;
  size?: AvatarSize;
}

const PlayerAvatar: React.FC<PlayerAvatarProps> = ({
  player,
  onPress,
  size = "s",
}) => {
  const textSize = size === "s" ? "small" : size === "m" ? "body" : "h2";
  const avatarContent = (
    <View style={[styles.avatar, styles[`size_${size}`]]}>
      {player && player.user?.photoUrl ? (
        <Image
          source={{ uri: player.user.photoUrl }}
          style={styles[`size_${size}`]}
        />
      ) : player ? (
        <CustomText style={styles.avatarText} type={textSize}>
          {getPlayerInitials(player.firstName, player.lastName)}
        </CustomText>
      ) : (
        <CustomText style={styles.avatarText} type={textSize}>
          +
        </CustomText>
      )}
    </View>
  );
  return onPress ? (
    <TouchableOpacity onPress={onPress}>{avatarContent}</TouchableOpacity>
  ) : (
    <>{avatarContent}</>
  );
};

export default PlayerAvatar;

import { Player } from "@/src/types";
import { getPlayerInitials } from "@/src/utils/player";
import { Image, TouchableOpacity, View } from "react-native";
import CustomText from "../ui/CustomText/CustomText";
import { styles } from "./PlayerAvatar.styles";

type AvatarSize = "s" | "m" | "l";

interface PlayerAvatarProps {
  player: Player;
  onPress?: () => void;
  size?: AvatarSize;
  inverse?: boolean;
}

const PlayerAvatar: React.FC<PlayerAvatarProps> = ({
  player,
  onPress,
  size = "s",
  inverse = false,
}) => {
  const textSize = size === "s" ? "small" : size === "m" ? "h2" : "h1";
  const avatarContent = (
    <View
      style={[
        styles.avatar,
        styles[`size_${size}`],
        inverse ? styles.avatarInverse : null,
      ]}
    >
      {player && player.user?.photoUrl ? (
        <Image
          source={{ uri: player.user.photoUrl }}
          style={styles[`size_${size}`]}
        />
      ) : (
        <CustomText
          style={[styles.avatarText, inverse ? styles.avatarTextInverse : {}]}
          type={textSize}
        >
          {player ? getPlayerInitials(player.firstName, player.lastName) : "+"}
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

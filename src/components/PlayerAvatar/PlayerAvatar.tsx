import { PlayerModalsContext } from "@/src/contexts/PlayerModalsContext";
import { Match, Player } from "@/src/types";
import { getPlayerInitials } from "@/src/utils/player";
import { useContext } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import CustomText from "../ui/CustomText/CustomText";
import { styles } from "./PlayerAvatar.styles";

type AvatarSize = "s" | "m" | "l";

interface PlayerAvatarProps {
  player: Player | null;
  size?: AvatarSize;
  inverse?: boolean;
  isCreator?: boolean;
  touchable?: boolean;
  match?: Match | undefined;
  team?: number | undefined;
  callback?: (p: Player) => void;
}

const PlayerAvatar: React.FC<PlayerAvatarProps> = ({
  player,
  size = "s",
  inverse = false,
  isCreator = false,
  touchable = true,
  match,
  team,
  callback,
}) => {
  const { openPlayerDetail, openAddPlayerToMatch } =
    useContext(PlayerModalsContext);

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
          bold
          style={[styles.avatarText, inverse ? styles.avatarTextInverse : {}]}
          type={textSize}
        >
          {player ? getPlayerInitials(player.firstName, player.lastName) : "+"}
        </CustomText>
      )}
    </View>
  );

  const avatarAction = player
    ? () => openPlayerDetail(player)
    : isCreator
    ? () => openAddPlayerToMatch(match!, team!, callback)
    : () => {};

  return touchable ? (
    <TouchableOpacity onPress={avatarAction}>{avatarContent}</TouchableOpacity>
  ) : (
    <>{avatarContent}</>
  );
};

export default PlayerAvatar;

import { Player } from "@/src/types";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./PlayersList.styles";
import { colors } from "@/src/theme";
import { MaterialIcons } from "@expo/vector-icons";
import PlayerAvatar from "../PlayerAvatar/PlayerAvatar";
import CustomText from "../ui/CustomText/CustomText";

interface PlayerItemProps {
  onPlayerSelect?: (p: Player) => void;
  player: Player;
}

const PlayerItem: React.FC<PlayerItemProps> = ({ onPlayerSelect, player }) => {
  return (
    <TouchableOpacity
      onPress={() => onPlayerSelect?.(player)}
      activeOpacity={0.6}
      style={styles.itemContainer}
    >
      <View style={styles.playerInfo}>
        <PlayerAvatar player={player} />
        <View>
          <CustomText bold type="body">
            {player.firstName} {player.lastName}
          </CustomText>
          <CustomText type="small" style={styles.sub}>
            {player.category?.description} • {player.position?.description} •{" "}
            {player.gender?.name}
          </CustomText>
        </View>
      </View>
      {onPlayerSelect && (
        <View style={styles.addIconContainer}>
          <MaterialIcons
            name="add-circle-outline"
            size={28}
            color={colors.primary}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default PlayerItem;

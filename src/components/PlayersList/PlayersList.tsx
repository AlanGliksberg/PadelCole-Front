import { getPlayers } from "@/src/services/player";
import { colors } from "@/src/theme";
import { Player } from "@/src/types";
import { MaterialIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import PlayerAvatar from "../PlayerAvatar/PlayerAvatar";
import CustomSearchInput from "../ui/CustomSearchInput/CustomSearchInput";
import CustomText from "../ui/CustomText/CustomText";
import EmptyState from "./EmptyState";
import { styles } from "./PlayersList.styles";

interface PlayersListProps {
  onPlayerSelect?: (p: Player) => void;
}

const PlayersList: React.FC<PlayersListProps> = ({ onPlayerSelect }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string | null>(null);

  const searchPlayers = useCallback(async () => {
    setLoading(true);
    const resultPlayers = await getPlayers(playerName);
    // TODO - controlar error
    setPlayers(resultPlayers.data?.players || []);
    setLoading(false);
  }, [playerName]);

  useEffect(() => {
    searchPlayers();
  }, [searchPlayers, playerName]);

  const clearSearch = () => {
    setPlayers([]);
  };

  return (
    <View style={styles.searchContainer}>
      <CustomSearchInput
        placeholder="Buscá un jugador"
        startSearchingOn={3}
        onSearch={setPlayerName}
        onClear={clearSearch}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={players}
          keyExtractor={(p) => p.id.toString()}
          style={styles.list}
          keyboardShouldPersistTaps="never"
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.playerInfo}>
                <PlayerAvatar player={item} />
                <View>
                  <CustomText bold type="body">
                    {item.firstName} {item.lastName}
                  </CustomText>
                  <CustomText type="small" style={styles.sub}>
                    {item.category?.description} • {item.position?.description}{" "}
                    • {item.gender?.name}
                  </CustomText>
                </View>
              </View>
              {onPlayerSelect && (
                <TouchableOpacity
                  style={styles.addIconContainer}
                  activeOpacity={0.6}
                  onPress={() => onPlayerSelect(item)}
                >
                  <MaterialIcons
                    name="add-circle-outline"
                    size={28}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={() => <EmptyState />}
        />
      )}
    </View>
  );
};

export default PlayersList;

import { getPlayers } from "@/src/services/player";
import { colors } from "@/src/theme";
import { Player } from "@/src/types";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import PlayerAvatar from "../PlayerAvatar/PlayerAvatar";
import CustomSearchInput from "../ui/CustomSearchInput/CustomSearchInput";
import CustomText from "../ui/CustomText/CustomText";
import ErrorSection from "../ui/ErrorSection/ErrorSection";
import EmptyState from "./EmptyState";
import FiltersModal from "./FiltersModal";
import { styles } from "./PlayersList.styles";

interface PlayersListProps {
  onPlayerSelect?: (p: Player) => void;
}

const PlayersList: React.FC<PlayersListProps> = ({ onPlayerSelect }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [playerName, setPlayerName] = useState<string | null>(null);

  const [appliedGenders, setAppliedGenders] = useState<string[]>([]);
  const [appliedPositions, setAppliedPositions] = useState<string[]>([]);
  const [appliedCategories, setAppliedCategories] = useState<string[]>([]);

  const [tempGenders, setTempGenders] = useState<string[]>([]);
  const [tempPositions, setTempPositions] = useState<string[]>([]);
  const [tempCategories, setTempCategories] = useState<string[]>([]);

  const [modalVisible, setModalVisible] = useState(false);

  const hasActiveFilters =
    appliedGenders.length > 0 ||
    appliedPositions.length > 0 ||
    appliedCategories.length > 0;

  const toggle = (
    val: string,
    arr: string[],
    setter: (v: string[]) => void
  ) => {
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const resetFilters = () => {
    setTempGenders([]);
    setTempPositions([]);
    setTempCategories([]);
  };

  // TODO - agregar paginado y ver mas
  const searchPlayers = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const resultPlayers = await getPlayers({
        name: playerName,
        gender: appliedGenders,
        position: appliedPositions,
        category: appliedCategories,
      });

      if (resultPlayers.error || !resultPlayers.data)
        throw new Error("Error buscando jugadores");

      setPlayers(resultPlayers.data.players || []);
    } catch (e) {
      console.log("Error:", e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [appliedCategories, appliedGenders, appliedPositions, playerName]);

  useEffect(() => {
    searchPlayers();
  }, [searchPlayers]);

  const clearSearch = () => {
    setPlayerName("");
    setPlayers([]);
  };

  const openFilters = () => {
    setTempGenders(appliedGenders);
    setTempPositions(appliedPositions);
    setTempCategories(appliedCategories);
    setModalVisible(true);
  };

  const applyFilters = () => {
    setAppliedGenders(tempGenders);
    setAppliedPositions(tempPositions);
    setAppliedCategories(tempCategories);
    setModalVisible(false);
  };

  return (
    <View style={styles.searchContainer}>
      <CustomSearchInput
        placeholder="Buscá un jugador por nombre"
        startSearchingOn={3}
        onSearch={setPlayerName}
        onClear={clearSearch}
      />
      <TouchableOpacity
        style={styles.filtersButton}
        onPress={openFilters}
        activeOpacity={0.7}
      >
        <View style={styles.filterIconContainer}>
          <MaterialIcons name="filter-list" size={20} color={colors.primary} />
          {hasActiveFilters && <View style={styles.activeFilterBadge} />}
        </View>
        <CustomText style={styles.filtersButtonText}>Filtros</CustomText>
      </TouchableOpacity>
      <FiltersModal
        visible={modalVisible}
        selectedGenders={tempGenders}
        selectedPositions={tempPositions}
        selectedCategories={tempCategories}
        onToggleGender={(g) => toggle(g, tempGenders, setTempGenders)}
        onTogglePosition={(p) => toggle(p, tempPositions, setTempPositions)}
        onToggleCategory={(c) => toggle(c, tempCategories, setTempCategories)}
        onApply={applyFilters}
        onCancel={() => setModalVisible(false)}
        resetFilters={resetFilters}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>
          {error && (
            <ErrorSection
              message="Error buscando jugadores"
              onRetry={searchPlayers}
            />
          )}
          {!error && (
            <FlatList
              data={players}
              keyExtractor={(p) => p.id.toString()}
              style={styles.list}
              keyboardShouldPersistTaps="never"
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.itemContainer}
                >
                  <View style={styles.playerInfo}>
                    <PlayerAvatar player={item} />
                    <View>
                      <CustomText bold type="body">
                        {item.firstName} {item.lastName}
                      </CustomText>
                      <CustomText type="small" style={styles.sub}>
                        {item.category?.description} •{" "}
                        {item.position?.description} • {item.gender?.name}
                      </CustomText>
                    </View>
                  </View>
                  {onPlayerSelect && (
                    <TouchableOpacity
                      style={styles.addIconContainer}
                      onPress={() => onPlayerSelect(item)}
                      activeOpacity={0.6}
                    >
                      <MaterialIcons
                        name="add-circle-outline"
                        size={28}
                        color={colors.primary}
                      />
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              ListEmptyComponent={() => <EmptyState />}
            />
          )}
        </>
      )}
    </View>
  );
};

export default PlayersList;

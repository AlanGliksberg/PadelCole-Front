import React, { useState } from "react";
import { Keyboard, ScrollView, View } from "react-native";
import { styles } from "./AvailableMatchesList.styles";
import MatchesFilters from "./MatchesFilters";
import { Match, MatchFilters } from "@/src/types";
import MatchesList from "../MatchesList/MatchesList";
import CustomText from "../ui/CustomText/CustomText";
import { getMatchesWithFilters } from "@/src/services/match";

const AvailableMatchesList: React.FC = () => {
  const [error, setError] = useState<boolean>(false);
  const [filters, setFilters] = useState<MatchFilters>({
    description: null,
    dateFrom: null,
    dateTo: null,
    timeFrom: null,
    timeTo: null,
    gender: null,
    category: null,
    duration: null,
  });

  let loadMatches = async (
    nextPage: number,
    pageSize: number
  ): Promise<[Match[], number] | void> => {
    try {
      setError(false);
      const res = await getMatchesWithFilters(
        nextPage,
        pageSize,
        filters,
        false
      );
      if (res.error || !res.data) throw new Error("Error al cargar partidos");
      const { matches: newMatches, totalMatches } = res.data;
      return [newMatches, totalMatches];
    } catch (e: any) {
      console.log(e);
      setError(true);
      return;
    }
  };

  const Empty = (
    <View>
      <CustomText>No hay partidos disponibles</CustomText>
    </View>
  );

  const handleFiltersChange = (filters: MatchFilters) => {
    setFilters(filters);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filtersCard}>
        <MatchesFilters onFiltersChange={handleFiltersChange} />
      </View>

      <ScrollView style={styles.matchesScroll}>
        <MatchesList
          key={JSON.stringify(filters)}
          loadMatches={loadMatches}
          error={error}
          EmptyComponent={Empty}
          viewMore
          allowApply
        />
      </ScrollView>
    </View>
  );
};

export default AvailableMatchesList;

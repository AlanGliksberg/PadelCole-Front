import React, { useState } from "react";
import { View } from "react-native";
import CustomText from "@/src/components/ui/CustomText/CustomText";
import { colors } from "@/src/theme";
import { Match } from "@/src/types/match/Match";
import { styles } from "./PlayerProfile.styles";
import MatchesList from "../MatchesList/MatchesList";
import { getCreatedMatches } from "@/src/services/match";

export default function MatchHistory() {
  const [error, setError] = useState<boolean>(false);

  const loadMatches = async (
    nextPage: number,
    pageSize: number
  ): Promise<[Match[], number] | void> => {
    try {
      setError(false);
      // TODO - cambiar por partidos completados
      const res = await getCreatedMatches(nextPage, pageSize);
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
    <View style={styles.emptyState}>
      <CustomText
        style={[styles.emptyStateText, { color: colors.description }]}
      >
        No tenés partidos registrados aún
      </CustomText>
      <CustomText
        style={[
          styles.emptyStateText,
          { color: colors.placeholder, fontSize: 14 },
        ]}
      >
        Cuando juegues partidos, aparecerán aquí
      </CustomText>
    </View>
  );

  return (
    <View style={styles.tabContent}>
      <View style={styles.historySection}>
        <CustomText style={styles.sectionTitle}>
          Historial de Partidos
        </CustomText>
        <MatchesList
          loadMatches={loadMatches}
          error={error}
          EmptyComponent={Empty}
          viewMore
        />
      </View>
    </View>
  );
}

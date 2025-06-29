import React from "react";
import { ScrollView, View } from "react-native";

import MatchBox from "@/src/components/MatchBox/MatchBox";
import MatchBoxSkeleton from "@/src/components/MatchBox/MatchBoxSkeleton";
import CustomText from "@/src/components/ui/CustomText/CustomText";
import { colors } from "@/src/theme";
import { Match } from "@/src/types/match/Match";
import { styles } from "./PlayerProfile.styles";

interface MatchHistoryProps {
  matches: Match[];
  loading: boolean;
}

export default function MatchHistory({ matches, loading }: MatchHistoryProps) {
  if (loading) {
    return (
      <View style={styles.tabContent}>
        <View style={styles.section}>
          <CustomText style={styles.sectionTitle}>
            Historial de Partidos
          </CustomText>
          <View style={styles.matchesContainer}>
            {[1, 2, 3].map((index) => (
              <MatchBoxSkeleton key={index} />
            ))}
          </View>
        </View>
      </View>
    );
  }

  if (matches.length === 0) {
    return (
      <View style={styles.tabContent}>
        <View style={styles.section}>
          <CustomText style={styles.sectionTitle}>
            Historial de Partidos
          </CustomText>
          <View style={styles.emptyState}>
            <CustomText
              style={[styles.emptyStateText, { color: colors.description }]}
            >
              No tienes partidos registrados aún
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
        </View>
      </View>
    );
  }

  return (
    <View style={styles.tabContent}>
      <View style={styles.section}>
        <CustomText style={styles.sectionTitle}>
          Historial de Partidos
        </CustomText>
        <ScrollView
          style={styles.matchesContainer}
          showsVerticalScrollIndicator={false}
        >
          {matches.map((match) => (
            <MatchBox key={match.id} match={match} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

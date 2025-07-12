import { removeGetCreatedMatchesCache } from "@/src/services/cache";
import { getCreatedMatches } from "@/src/services/match";
import { Match, MeFaltaAlguienStackParamList } from "@/src/types";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { CustomText, FullButton, MatchesList } from "../../components";
import EmptyState from "./EmptyState";
import { styles } from "./MeFaltaAlguien.styles";

export default function MeFaltaAlguien() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState<boolean>(false);
  const navigation =
    useNavigation<NavigationProp<MeFaltaAlguienStackParamList>>();

  const loadMatches = async (
    nextPage: number = 1,
    pageSize: number
  ): Promise<[Match[], number] | void> => {
    try {
      setError(false);
      const res = await getCreatedMatches(nextPage, pageSize);
      if (res.error || !res.data) throw new Error("Error al cargar partidos");
      const { matches: newMatches, totalMatches } = res.data;
      setMatches(newMatches);
      return [newMatches, totalMatches];
    } catch (e: any) {
      console.log(e);
      setMatches([]);
      setError(true);
      return;
    }
  };

  // TODO - forzar refresh
  return (
    <View style={styles.container}>
      <View style={styles.matchesContainer}>
        {matches.length > 0 && (
          <CustomText style={styles.matchesText} bold>
            Tus partidos pendientes:
          </CustomText>
        )}

        <ScrollView style={styles.matchesScroll}>
          <MatchesList
            loadMatches={loadMatches}
            refreshData={async () => {
              removeGetCreatedMatchesCache();
            }}
            error={error}
            showCreatorDetails
            EmptyComponent={<EmptyState />}
            viewMore
          />
        </ScrollView>
      </View>

      {matches.length > 0 && (
        <View>
          <CustomText style={styles.createMatchText} bold>
            Creá tu próximo partido:
          </CustomText>
          <FullButton
            onPress={() => navigation.navigate("CrearPartido")}
            size="l"
            style={styles.createMatchButton}
          >
            <CustomText.ButtonText uppercase type="small">
              Crear partido
            </CustomText.ButtonText>
          </FullButton>
        </View>
      )}
    </View>
  );
}

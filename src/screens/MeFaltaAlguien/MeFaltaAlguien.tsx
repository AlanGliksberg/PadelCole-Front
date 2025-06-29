import { removeGetCreatedMatchesCache } from "@/src/services/cache";
import { getCreatedMatches } from "@/src/services/match";
import { Match, MeFaltaAlguienStackParamList } from "@/src/types";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, View } from "react-native";
import {
  CustomText,
  ErrorSection,
  FullButton,
  MatchBox,
  MatchBoxSkeleton,
  SimpleButton,
} from "../../components";
import EmptyState from "./EmptyState";
import { styles } from "./MeFaltaAlguien.styles";

const pageSize = 3;

export default function MeFaltaAlguien() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<boolean>(false);
  const navigation =
    useNavigation<NavigationProp<MeFaltaAlguienStackParamList>>();

  const fakeMatches = Array(pageSize + 1).fill({} as Match);
  const loadMatches = async (nextPage = 1) => {
    try {
      setError(false);
      setMatches((prev) =>
        nextPage === 1 ? fakeMatches : [...prev, ...fakeMatches]
      );
      const res = await getCreatedMatches(nextPage, pageSize);
      if (res.error || !res.data) throw new Error("Error al cargar partidos");
      const { matches: newMatches, totalMatches } = res.data!;
      setMatches((prev) => {
        const newIds = newMatches.map((m) => m.id);
        const realPrev = prev.filter((m) => !!m.id && !newIds.includes(m.id));
        return nextPage === 1 ? newMatches : [...realPrev, ...newMatches];
      });
      setTotal(totalMatches);
      setPage(nextPage);
    } catch (e: any) {
      console.log(e);
      setError(true);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadMatches();
    }, [])
  );
  return (
    <View style={styles.container}>
      <View style={styles.matchesContainer}>
        {matches.length > 0 && (
          <CustomText style={styles.matchesText} bold>
            Tus partidos pendientes:
          </CustomText>
        )}

        {error && (
          <ErrorSection
            message="Error buscando tus partidos"
            onRetry={loadMatches}
          />
        )}

        {!error && (
          <FlatList
            data={matches}
            keyExtractor={(m, i) => m.id?.toString() ?? `skeleton-${i}`}
            renderItem={({ item }) =>
              item.id ? (
                <MatchBox
                  match={item}
                  showCreatorDetails
                  refreshData={async () => {
                    removeGetCreatedMatchesCache();
                    await loadMatches();
                  }}
                />
              ) : (
                <MatchBoxSkeleton />
              )
            }
            contentContainerStyle={styles.list}
            ListFooterComponent={
              matches.length < total ? (
                <SimpleButton
                  title="Ver más"
                  onPress={() => loadMatches(page + 1)}
                  style={styles.loadMore}
                />
              ) : null
            }
            ListEmptyComponent={<EmptyState />}
          />
        )}
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

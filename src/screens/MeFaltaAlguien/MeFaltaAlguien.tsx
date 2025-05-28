import { FALTA_ALGUIEN_PAGE_NAME } from "@/src/constants/pages";
import { getCreatedMatches } from "@/src/services/match";
import { GetCreatedMatchesResponse, Match } from "@/src/types";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import {
  CustomScreen,
  CustomText,
  ErrorSection,
  FullButton,
  MatchBox,
  MatchBoxSkeleton,
  SimpleButton,
} from "../../components";
import { styles } from "./MeFaltaAlguien.styles";

const pageSize = 3;

export default function MeFaltaAlguien() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<boolean>(false);

  const fakeMatches = Array(pageSize + 1).fill({} as Match);
  const loadMatches = async (nextPage = 1) => {
    try {
      setError(false);
      setMatches((prev) =>
        nextPage === 1 ? fakeMatches : [...prev, ...fakeMatches]
      );
      const res = await getCreatedMatches<GetCreatedMatchesResponse>(
        nextPage,
        pageSize
      );
      if (res.error || !res.data) throw new Error("Error al cargar partidos");
      const { matches: newMatches, totalMatches } = res.data;
      setMatches((prev) => {
        const realPrev = prev.filter((m) => !!m.id);
        return nextPage === 1 ? newMatches : [...realPrev, ...newMatches];
      });
      setTotal(totalMatches);
      setPage(nextPage);
    } catch (e: any) {
      setError(true);
    }
  };

  useEffect(() => {
    loadMatches();
  }, []);

  //TODO - si no hay partidos tengo que mostrar otra pantalla
  // cachear la llamada a la api
  return (
    <CustomScreen title={FALTA_ALGUIEN_PAGE_NAME}>
      <View style={styles.container}>
        <View style={styles.matchesContainer}>
          <CustomText style={styles.matchesText} bold>
            Tus partidos pendientes:
          </CustomText>

          {error && (
            <ErrorSection
              message="Error buscando tus partidos"
              onRetry={loadMatches}
            />
          )}

          {!error && (
            <FlatList
              data={matches}
              keyExtractor={(m, i) => m.id ?? `skeleton-${i}`}
              renderItem={({ item }) =>
                item.id ? (
                  <MatchBox match={item} showApplications />
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
            />
          )}
        </View>
        <View>
          <CustomText style={styles.createMatchText} bold>
            Creá tu próximo partido:
          </CustomText>
          <FullButton
            onPress={() => router.push("/home")}
            size="l"
            style={styles.createMatchButton}
          >
            <CustomText.ButtonText>Crear partido</CustomText.ButtonText>
          </FullButton>
        </View>
      </View>
    </CustomScreen>
  );
}

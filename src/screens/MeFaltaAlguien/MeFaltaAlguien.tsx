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
  SimpleButton,
} from "../../components";
import { styles } from "./MeFaltaAlguien.styles";

export default function MeFaltaAlguien() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const loadMatches = async (nextPage = 1) => {
    try {
      setError(false);
      setLoading(true);
      const res = await getCreatedMatches<GetCreatedMatchesResponse>(
        nextPage,
        3
      );
      if (res.error || !res.data) throw new Error("Error al cargar partidos");
      const { matches: newMatches, totalMatches } = res.data;
      setMatches((prev) =>
        nextPage === 1 ? newMatches : [...prev, ...newMatches]
      );
      setTotal(totalMatches);
      setPage(nextPage);
    } catch (e: any) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();
  }, []);

  const errorSection = (
    <>
      <ErrorSection
        message="Error buscando tus partidos"
        onRetry={loadMatches}
      />
    </>
  );

  //pensar el loader por secciones y si uso skeleton
  return (
    <CustomScreen title={FALTA_ALGUIEN_PAGE_NAME} loading={loading}>
      <View style={styles.container}>
        <View style={styles.matchesContainer}>
          <CustomText style={styles.matchesText} bold>
            Tus partidos pendientes:
          </CustomText>

          {error && errorSection}

          {!error && !loading && (
            <FlatList
              data={matches}
              keyExtractor={(m) => m.id}
              renderItem={({ item }) => <MatchBox match={item} />}
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

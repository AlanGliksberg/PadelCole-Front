import { FALTA_ALGUIEN_PAGE_NAME } from "@/src/constants/pages";
import { getCreatedMatches } from "@/src/services/match";
import { GetCreatedMatchesResponse, Match } from "@/src/types";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { CustomScreen, CustomText, FullButton } from "../../components";
import { LoadingContext } from "../../contexts/LoadingContext";
import { styles } from "./MeFaltaAlguien.styles";

export default function MeFaltaAlguien() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { showLoading, hideLoading } = useContext(LoadingContext);

  const loadMatches = async (nextPage = 1) => {
    try {
      showLoading();
      const res = await getCreatedMatches<GetCreatedMatchesResponse>(
        nextPage,
        20
      );
      if (res.error || !res.data) throw new Error("Error al cargar partidos");
      const { matches: newMatches, totalMatches } = res.data;
      setMatches((prev) =>
        nextPage === 1 ? newMatches : [...prev, ...newMatches]
      );
      setTotal(totalMatches);
      setPage(nextPage);
    } catch (e: any) {
      Alert.alert("Error", e.message);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    loadMatches(1);
  }, []);

  const renderMatch = ({ item }: { item: Match }) => (
    <View style={styles.card}>
      <CustomText.ButtonText style={styles.status}>
        {item.status.description}
      </CustomText.ButtonText>
      <CustomText style={styles.location}>{item.location}</CustomText>
      {item.description && (
        <CustomText style={styles.description}>{item.description}</CustomText>
      )}
      <CustomText style={styles.meta}>
        {item.dateTime.replace("T", " ")}
      </CustomText>
      <View style={styles.row}>
        <CustomText style={styles.tag}>{item.category}</CustomText>
        <CustomText style={styles.tag}>{item.duration} min</CustomText>
        <CustomText style={styles.tag}>{item.gender}</CustomText>
      </View>
      <CustomText style={styles.subheader}>Jugadores:</CustomText>
      <View style={styles.playersRow}>
        {item.teams
          .flatMap((team) => team.players)
          .map((p) => (
            <CustomText.ButtonText key={p.id} style={styles.player}>
              {p.firstName}
            </CustomText.ButtonText>
          ))}
      </View>
    </View>
  );

  const ListHeader = () => (
    <FullButton style={styles.createButton} onPress={() => {}}>
      <CustomText.ButtonText style={styles.createButtonText}>
        Crear partido
      </CustomText.ButtonText>
    </FullButton>
  );

  return (
    <CustomScreen title={FALTA_ALGUIEN_PAGE_NAME}>
      <Text>Bienvenido a MeFaltaAlguien</Text>
    </CustomScreen>
  );
}

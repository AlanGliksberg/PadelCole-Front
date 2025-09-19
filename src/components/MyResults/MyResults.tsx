import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { styles } from "./MyResults.style";
import {
  AppStackParamList,
  Match,
  MeFaltaAlguienStackParamList,
} from "@/src/types";
import MatchesList from "../MatchesList/MatchesList";
import CustomText from "../ui/CustomText/CustomText";
import Foundation from "@expo/vector-icons/Foundation";
import { colors } from "@/src/theme";
import { getMyPendingResults } from "@/src/services/match";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import SimpleButton from "../ui/SimpleButton/SimpleButton";

const MyResults: React.FC = () => {
  const [error, setError] = useState<boolean>(false);
  const navigation =
    useNavigation<
      NavigationProp<AppStackParamList & MeFaltaAlguienStackParamList>
    >();

  let loadMatches = async (
    nextPage: number,
    pageSize: number
  ): Promise<[Match[], number] | void> => {
    try {
      setError(false);
      const res = await getMyPendingResults(nextPage, pageSize);
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
    <View style={styles.emptyContainer}>
      <Foundation name="clipboard-notes" size={100} color={colors.secondary} />
      <View style={styles.textContainer}>
        <CustomText type="h4" bold style={styles.emptyTitle}>
          ¡No tenés resultados por cargar!
        </CustomText>
        <CustomText type="medium" style={styles.emptySubtitle}>
          Seguí jugando partidos y acordate de cargar tus resultados acá
        </CustomText>
        <SimpleButton
          title="Buscá partidos"
          size="m"
          onPress={() => navigation.navigate("QuieroJugar")}
          textStyle={styles.search}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.matchesScroll}>
        <MatchesList
          loadMatches={loadMatches}
          error={error}
          EmptyComponent={Empty}
          viewMore
          allowResults
        />
      </ScrollView>
    </View>
  );
};

export default MyResults;

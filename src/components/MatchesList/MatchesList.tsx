import React, { useCallback, useMemo, useState } from "react";
import ErrorSection from "../ui/ErrorSection/ErrorSection";
import MatchBox from "../MatchBox/MatchBox";
import MatchBoxSkeleton from "../MatchBox/MatchBoxSkeleton";
import SimpleButton from "../ui/SimpleButton/SimpleButton";
import { styles } from "./MatchesList.styles";
import { Match } from "@/src/types";
import { useFocusEffect } from "@react-navigation/native";
import { View } from "react-native";

interface MatchesListProps {
  pageSize?: number;
  loadMatches: (
    page: number,
    pageSize: number
  ) => Promise<[Match[], number] | void>;
  refreshData?: () => Promise<void>;
  error?: boolean;
  showCreatorDetails?: boolean;
  EmptyComponent?: React.ReactElement;
  viewMore?: boolean;
}

export default function MatchesList({
  pageSize = 3,
  loadMatches,
  refreshData,
  error,
  EmptyComponent,
  showCreatorDetails,
  viewMore,
}: MatchesListProps) {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [matches, setMatches] = useState<Match[]>([]);

  const fakeMatches = useMemo(
    () => Array(pageSize).fill({} as Match),
    [pageSize]
  );

  const loadMatchesData = useCallback(
    async (newPage: number = 1) => {
      setMatches((prev) =>
        newPage === 1 ? fakeMatches : [...prev, ...fakeMatches]
      );
      const [matchesList, totalMatches] = (await loadMatches(
        newPage,
        pageSize
      )) || [[], 0];

      setMatches((prev) => {
        const newIds = matchesList.map((m) => m.id);
        const realPrev = prev.filter((m) => !!m.id && !newIds.includes(m.id));
        return newPage === 1 ? matchesList : [...realPrev, ...matchesList];
      });
      setPage(newPage);
      setTotal(totalMatches);
    },
    [loadMatches, pageSize, fakeMatches]
  );

  useFocusEffect(
    useCallback(() => {
      loadMatchesData(1);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  return (
    <>
      {error && (
        <ErrorSection
          message="Error buscando tus partidos"
          onRetry={loadMatchesData}
        />
      )}

      {!error && (
        <View style={styles.matchesContainer}>
          {matches.length === 0 && (EmptyComponent || <></>)}
          {matches.map((item, i) =>
            item.id ? (
              <MatchBox
                key={item.id}
                match={item}
                showCreatorDetails={showCreatorDetails}
                refreshData={async () => {
                  refreshData?.();
                  await loadMatchesData();
                }}
              />
            ) : (
              <MatchBoxSkeleton key={`skeleton-${i}`} />
            )
          )}
          {viewMore && matches.length < total && (
            <SimpleButton
              title="Ver más"
              onPress={() => loadMatchesData(page + 1)}
              style={styles.loadMore}
            />
          )}
        </View>
      )}
    </>
  );
}

import React, { useState } from "react";
import {
  ApplicationsList,
  AvailableMatchesList,
  CustomScreen,
} from "@/src/components";
import { QUIERO_JUGAR_PAGE_NAME } from "@/src/constants/pages";
import { MatchTabs } from "@/src/components/MatchTabs/MatchTabs";

export default function QuieroJugar() {
  const [selectedTab, setSelectedTab] = useState<"partidos" | "postulaciones">(
    "partidos"
  );

  return (
    <CustomScreen title={QUIERO_JUGAR_PAGE_NAME}>
      <MatchTabs selectedTab={selectedTab} onTabChange={setSelectedTab} />
      {selectedTab === "partidos" ? (
        <AvailableMatchesList />
      ) : (
        <ApplicationsList goToMatches={() => setSelectedTab("partidos")} />
      )}
    </CustomScreen>
  );
}

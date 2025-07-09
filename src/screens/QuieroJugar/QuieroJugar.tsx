import React, { useState } from "react";
import { CustomScreen } from "@/src/components";
import { QUIERO_JUGAR_PAGE_NAME } from "@/src/constants/pages";
import { MatchTabs } from "@/src/components/MatchTabs/MatchTabs";
import PartidosList from "./PartidosList";
import PostulacionesList from "./PostulacionesList";

export default function QuieroJugar() {
  const [selectedTab, setSelectedTab] = useState<"partidos" | "postulaciones">(
    "partidos"
  );

  return (
    <CustomScreen title={QUIERO_JUGAR_PAGE_NAME}>
      <MatchTabs selectedTab={selectedTab} onTabChange={setSelectedTab} />
      {selectedTab === "partidos" ? <PartidosList /> : <PostulacionesList />}
    </CustomScreen>
  );
}

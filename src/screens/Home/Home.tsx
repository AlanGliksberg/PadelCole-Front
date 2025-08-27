import React, { useState } from "react";
import { CustomScreen, TabSelector } from "@/src/components";
import { HOME_PAGE_NAME } from "@/src/constants/pages";

type HomeTabType = "partidos" | "resultados";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<HomeTabType>("partidos");

  const tabs = [
    { id: "partidos", label: "Partidos" },
    { id: "resultados", label: "Resultados" },
  ] as const;

  return (
    <CustomScreen title={HOME_PAGE_NAME}>
      <TabSelector<HomeTabType>
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      />
      {selectedTab === "partidos" ? <></> : <></>}
    </CustomScreen>
  );
}

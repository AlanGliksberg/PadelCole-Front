import React, { useState } from "react";
import {
  ApplicationsList,
  AvailableMatchesList,
  CustomScreen,
  TabSelector,
} from "@/src/components";
import { QUIERO_JUGAR_PAGE_NAME } from "@/src/constants/pages";

export default function QuieroJugar() {
  const [key, setKey] = useState(1);

  const tabs = [
    { id: "partidos", label: "Partidos", component: <AvailableMatchesList /> },
    {
      id: "postulaciones",
      label: "Mis postulaciones",
      component: (
        <ApplicationsList goToMatches={() => setKey((prev) => prev + 1)} />
      ),
    },
  ];
  return (
    <CustomScreen title={QUIERO_JUGAR_PAGE_NAME}>
      <TabSelector tabs={tabs} key={key} />
    </CustomScreen>
  );
}

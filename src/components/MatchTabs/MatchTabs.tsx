import React from "react";
import { TabSelector } from "../ui/TabSelector/TabSelector";

type MatchTabType = "partidos" | "postulaciones";

interface MatchTabsProps {
  selectedTab: MatchTabType;
  onTabChange: (tab: MatchTabType) => void;
}

const tabs = [
  { id: "partidos", label: "Partidos" },
  { id: "postulaciones", label: "Mis postulaciones" },
] as const;

export const MatchTabs: React.FC<MatchTabsProps> = ({
  selectedTab,
  onTabChange,
}) => {
  return (
    <TabSelector<MatchTabType>
      tabs={tabs}
      selectedTab={selectedTab}
      onTabChange={onTabChange}
    />
  );
};

import React, { createContext, ReactNode, useState } from "react";
import { PlayerDetailModal } from "../components";
import { Player } from "../types";

interface PlayerModalsContextData {
  openPlayerDetail: (player: Player) => void;
  closePlayerDetail: () => void;
}

export const PlayerModalsContext = createContext<PlayerModalsContextData>({
  openPlayerDetail: (p: Player) => {},
  closePlayerDetail: () => {},
});

export const PlayerModalsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const openPlayerDetail = (selectedPlayer: Player) =>
    setSelectedPlayer(selectedPlayer);
  const closePlayerDetail = () => setSelectedPlayer(null);

  return (
    <PlayerModalsContext.Provider
      value={{ openPlayerDetail, closePlayerDetail }}
    >
      {children}
      <PlayerDetailModal
        player={selectedPlayer}
        closePlayerDetail={closePlayerDetail}
      />
    </PlayerModalsContext.Provider>
  );
};

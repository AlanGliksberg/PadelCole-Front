import React, { createContext, ReactNode, useState } from "react";
import { Player } from "../types";
import { AddPlayerToMatch, PlayerDetailsModal } from "../components";

interface PlayerModalsContextData {
  openPlayerDetail: (player: Player) => void;
  closePlayerDetail: () => void;
  openAddPlayerToMatch: () => void;
  closeAddPlayerToMatch: () => void;
}

export const PlayerModalsContext = createContext<PlayerModalsContextData>({
  openPlayerDetail: (p: Player) => {},
  closePlayerDetail: () => {},
  openAddPlayerToMatch: () => {},
  closeAddPlayerToMatch: () => {},
});

export const PlayerModalsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const openPlayerDetail = (selectedPlayer: Player) =>
    setSelectedPlayer(selectedPlayer);
  const closePlayerDetail = () => setSelectedPlayer(null);

  const [openAddPlayerModal, setOpenAddPlayerModal] = useState<boolean>(false);
  const openAddPlayerToMatch = () => {
    setOpenAddPlayerModal(true);
  };
  const closeAddPlayerToMatch = () => {
    setOpenAddPlayerModal(false);
  };

  return (
    <PlayerModalsContext.Provider
      value={{
        openPlayerDetail,
        closePlayerDetail,
        openAddPlayerToMatch,
        closeAddPlayerToMatch,
      }}
    >
      {children}
      <PlayerDetailsModal
        player={selectedPlayer}
        closePlayerDetail={closePlayerDetail}
      />
      <AddPlayerToMatch
        isOpen={openAddPlayerModal}
        closeModal={closeAddPlayerToMatch}
      />
    </PlayerModalsContext.Provider>
  );
};

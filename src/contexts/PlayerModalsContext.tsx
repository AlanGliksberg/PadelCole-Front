import React, { createContext, ReactNode, useState } from "react";
import { AddPlayerToMatchModal, PlayerDetailsModal } from "../components";
import { Match, Player } from "../types";

interface PlayerModalsContextData {
  openPlayerDetail: (player: Player) => void;
  closePlayerDetail: () => void;
  openAddPlayerToMatch: (m: Match, t: number, c?: () => Promise<void>) => void;
  closeAddPlayerToMatch: () => void;
}

export const PlayerModalsContext = createContext<PlayerModalsContextData>({
  openPlayerDetail: (p: Player) => {},
  closePlayerDetail: () => {},
  openAddPlayerToMatch: (m: Match, t: number, c?: () => Promise<void>) => {},
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
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [callbackFn, setCallbackFn] = useState<
    (() => Promise<void>) | undefined
  >();
  const openAddPlayerToMatch = (
    match: Match,
    team: number,
    callback?: () => Promise<void>
  ) => {
    setSelectedMatch(match);
    setSelectedTeam(team);
    setCallbackFn(() => callback);
    setOpenAddPlayerModal(true);
  };
  const closeAddPlayerToMatch = () => {
    setCallbackFn(undefined);
    setSelectedMatch(null);
    setSelectedTeam(null);
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
      <AddPlayerToMatchModal
        isOpen={openAddPlayerModal}
        closeModal={closeAddPlayerToMatch}
        match={selectedMatch}
        team={selectedTeam}
        onPlayerAdd={callbackFn}
      />
    </PlayerModalsContext.Provider>
  );
};

import React, { createContext, ReactNode, useState } from "react";
import { AddPlayerToMatchModal, PlayerDetailsModal } from "../components";
import { Match, Player } from "../types";

interface PlayerModalsContextData {
  openPlayerDetail: (player: Player, removeCallback?: () => void) => void;
  closePlayerDetail: () => void;
  openAddPlayerToMatch: (m: Match, t: number, c?: (p: Player) => void) => void;
  closeAddPlayerToMatch: () => void;
}

export const PlayerModalsContext = createContext<PlayerModalsContextData>({
  openPlayerDetail: (p: Player) => {},
  closePlayerDetail: () => {},
  openAddPlayerToMatch: (m: Match, t: number, c?: (p: Player) => void) => {},
  closeAddPlayerToMatch: () => {},
});

export const PlayerModalsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [removePlayerCallback, setRemovePlayerCallback] =
    useState<() => void>();
  const openPlayerDetail = (
    selectedPlayer: Player,
    removeCallback?: () => void
  ) => {
    setSelectedPlayer(selectedPlayer);
    setRemovePlayerCallback(() => removeCallback);
  };
  const closePlayerDetail = () => {
    setSelectedPlayer(null);
    setRemovePlayerCallback(undefined);
  };

  const [openAddPlayerModal, setOpenAddPlayerModal] = useState<boolean>(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [callbackFn, setCallbackFn] = useState<
    ((p: Player) => void) | undefined
  >();
  const openAddPlayerToMatch = (
    match: Match,
    team: number,
    callback?: (p: Player) => void
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
        removeCallback={removePlayerCallback}
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

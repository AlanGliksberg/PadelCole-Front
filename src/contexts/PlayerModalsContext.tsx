import React, { createContext, ReactNode, useState } from "react";
import { AddPlayerToMatchModal, PlayerDetailsModal } from "../components";
import ApplicationsModal from "../components/Modals/ApplicationsModal";
import { Match, Player } from "../types";

interface PlayerModalsContextData {
  openPlayerDetail: (player: Player, removeCallback?: () => void) => void;
  closePlayerDetail: () => void;
  openAddPlayerToMatch: (m: Match, t: number, c?: (p: Player) => void) => void;
  closeAddPlayerToMatch: () => void;
  openApplicationsModal: (match: Match) => void;
  closeApplicationsModal: () => void;
}

export const PlayerModalsContext = createContext<PlayerModalsContextData>({
  openPlayerDetail: (p: Player) => {},
  closePlayerDetail: () => {},
  openAddPlayerToMatch: (m: Match, t: number, c?: (p: Player) => void) => {},
  closeAddPlayerToMatch: () => {},
  openApplicationsModal: (match: Match) => {},
  closeApplicationsModal: () => {},
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

  const [applicationsMatch, setApplicationsMatch] = useState<Match | null>(
    null
  );

  const openApplicationsModal = (match: Match) => setApplicationsMatch(match);

  const closeApplicationsModal = () => setApplicationsMatch(null);

  return (
    <PlayerModalsContext.Provider
      value={{
        openPlayerDetail,
        closePlayerDetail,
        openAddPlayerToMatch,
        closeAddPlayerToMatch,
        openApplicationsModal,
        closeApplicationsModal,
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
      <ApplicationsModal
        closeModal={closeApplicationsModal}
        isOpen={!!applicationsMatch}
        match={applicationsMatch}
      />
    </PlayerModalsContext.Provider>
  );
};

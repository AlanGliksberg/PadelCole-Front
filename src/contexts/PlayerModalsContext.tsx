import React, { createContext, ReactNode, useState } from "react";
import { AddPlayerToMatchModal, PlayerDetailsModal } from "../components";
import ApplicationsModal from "../components/Modals/ApplicationsModal";
import ChangePasswordModal from "../components/Modals/ChangePasswordModal";
import EditProfileModal from "../components/Modals/EditProfileModal";
import { removeGetCreatedMatchesCache } from "../services/cache";
import { Match, Player } from "../types";
import { Application } from "../types/application/Application";

interface PlayerModalsContextData {
  openPlayerDetail: (player: Player, removeCallback?: () => void) => void;
  closePlayerDetail: () => void;
  openAddPlayerToMatch: (m: Match, t: number, c?: (p: Player) => void) => void;
  closeAddPlayerToMatch: () => void;
  openApplicationsModal: (
    match: Match,
    refreshData?: () => Promise<void>
  ) => void;
  closeApplicationsModal: () => void;
  openChangePasswordModal: () => void;
  closeChangePasswordModal: () => void;
  openEditProfileModal: (player: Player, onUpdate: () => void) => void;
  closeEditProfileModal: () => void;
}

export const PlayerModalsContext = createContext<PlayerModalsContextData>({
  openPlayerDetail: (p: Player) => {},
  closePlayerDetail: () => {},
  openAddPlayerToMatch: (m: Match, t: number, c?: (p: Player) => void) => {},
  closeAddPlayerToMatch: () => {},
  openApplicationsModal: (
    match: Match,
    refreshData?: () => Promise<void>
  ) => {},
  closeApplicationsModal: () => {},
  openChangePasswordModal: () => {},
  closeChangePasswordModal: () => {},
  openEditProfileModal: (player: Player, onUpdate: () => void) => {},
  closeEditProfileModal: () => {},
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
  const [refreshData, setRefreshData] = useState<
    (() => Promise<void>) | undefined
  >();
  const openApplicationsModal = (
    match: Match,
    refreshData?: () => Promise<void>
  ) => {
    setApplicationsMatch(match);
    setRefreshData(() => refreshData);
  };
  const closeApplicationsModal = () => setApplicationsMatch(null);
  const refreshApplications = async (applications: Application[]) => {
    setApplicationsMatch((prev) =>
      prev
        ? {
            ...prev,
            applications,
          }
        : null
    );
    refreshData && (await refreshData());
    removeGetCreatedMatchesCache();
  };

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const openChangePasswordModal = () => {
    setShowChangePasswordModal(true);
  };
  const closeChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };

  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editProfilePlayer, setEditProfilePlayer] = useState<Player | null>(
    null
  );
  const [editProfileCallback, setEditProfileCallback] = useState<
    (() => void) | null
  >(null);
  const openEditProfileModal = (player: Player, onUpdate: () => void) => {
    setEditProfilePlayer(player);
    setEditProfileCallback(() => onUpdate);
    setShowEditProfileModal(true);
  };

  const closeEditProfileModal = () => {
    setShowEditProfileModal(false);
    setEditProfilePlayer(null);
    setEditProfileCallback(null);
  };

  return (
    <PlayerModalsContext.Provider
      value={{
        openPlayerDetail,
        closePlayerDetail,
        openAddPlayerToMatch,
        closeAddPlayerToMatch,
        openApplicationsModal,
        closeApplicationsModal,
        openChangePasswordModal,
        closeChangePasswordModal,
        openEditProfileModal,
        closeEditProfileModal,
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
        refreshApplications={refreshApplications}
      />
      <ChangePasswordModal
        isVisible={showChangePasswordModal}
        onClose={closeChangePasswordModal}
      />
      <EditProfileModal
        isVisible={showEditProfileModal}
        onClose={closeEditProfileModal}
        player={editProfilePlayer}
        onUpdate={editProfileCallback || (() => {})}
      />
    </PlayerModalsContext.Provider>
  );
};

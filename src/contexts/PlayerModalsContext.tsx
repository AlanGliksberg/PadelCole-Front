import React, { createContext, ReactNode, useContext, useState } from "react";
import { AddPlayerToMatchModal, PlayerDetailsModal } from "../components";
import ApplicationsModal from "../components/Modals/ApplicationsModal";
import ChangePasswordModal from "../components/Modals/ChangePasswordModal";
import EditProfileModal from "../components/Modals/EditProfileModal";
import { removeGetCreatedMatchesCache } from "../services/cache";
import { Match, Player } from "../types";
import { Application } from "../types/application/Application";
import { ModalContext } from "./ModalContext";

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
  const { openModal } = useContext(ModalContext);

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
  const refreshApplications = async (
    applications: Application[],
    type: "accepted" | "rejected"
  ) => {
    const players = applicationsMatch?.players || [];
    if (type === "accepted") {
      const acceptedApplication = applicationsMatch?.applications.find(
        (a) => !applications.some((app) => app.id === a.id)
      );
      players?.push({ id: acceptedApplication?.playerId } as Player);
    }
    setApplicationsMatch((prev) =>
      prev
        ? {
            ...prev,
            players: players,
            applications,
          }
        : null
    );
    // Si se aceptó al último jugador, cierro el modal
    if (type === "accepted" && applicationsMatch?.players?.length === 4) {
      openModal({
        title: "¡Partido confirmado!",
        message:
          "Ya juntaste a todos los jugadores, ahora solo queda disfrutar del partido.",
        secondParagraph: "¡Buena suerte!",
      });
      closeApplicationsModal();
    }
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

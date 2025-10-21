import { ModalContext } from "@/src/contexts/ModalContext";
import {
  acceptApplication,
  rejectApplication,
} from "@/src/services/application";
import { colors } from "@/src/theme";
import { Application } from "@/src/types/application/Application";
import { ApplicationsModalProps } from "@/src/types/modals/CustomModal";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ApplicationItem from "../ApplicationItem/ApplicationItem";
import CustomText from "../ui/CustomText/CustomText";
import { styles } from "./ApplicationsModal.styles";
import CustomModalView from "./CustomModalView";

const ApplicationsModal: React.FC<ApplicationsModalProps> = ({
  match,
  isOpen,
  closeModal,
  refreshApplications,
}) => {
  const [loading, setLoading] = useState(false);
  const { openModal, openErrorModal } = useContext(ModalContext);

  if (!match) return null;

  const handleAcceptApplication = async (
    application: Application,
    selectedTeam: 1 | 2
  ) => {
    setLoading(true);
    const res = await acceptApplication(application.id, selectedTeam);
    if (res.error) {
      openErrorModal(
        "Postulación",
        "Hubo un error inesperado al aceptar la postulación. Intentá nuevamente"
      );
      setLoading(false);
      return;
    }

    openModal({
      title: "Postulación",
      message: `Se ha agregado correctamente al jugador ${application.player.firstName} ${application.player.lastName} al partido`,
      primaryAction: () => {
        refreshApplications(
          match.applications.filter((a) => a.id !== application.id),
          "accepted"
        );
      },
    });

    setLoading(false);
  };

  const handleRejectApplication = async (application: Application) => {
    setLoading(true);
    const res = await rejectApplication(application.id);
    if (res.error) {
      openErrorModal(
        "Postulación",
        "Hubo un error inesperado al rechazar la postulación. Intentá nuevamente"
      );
      setLoading(false);
      return;
    }

    openModal({
      title: "Postulación",
      message: `Se ha rechazado correctamente al jugador ${application.player.firstName} ${application.player.lastName} del partido`,
      primaryAction: () => {
        refreshApplications(
          match.applications.filter((a) => a.id !== application.id),
          "rejected"
        );
      },
    });
    setLoading(false);
  };

  return (
    <CustomModalView
      visible={isOpen}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.modal}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.header}>
              <CustomText type="h3" bold style={styles.title}>
                Postulaciones
              </CustomText>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <MaterialIcons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {match.applications && match.applications.length > 0 ? (
              <ScrollView>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.applicationsContainer}
                >
                  {match.applications.map((application) => (
                    <ApplicationItem
                      key={application.id}
                      application={application}
                      onAccept={handleAcceptApplication}
                      onReject={handleRejectApplication}
                      loading={loading}
                    />
                  ))}
                </TouchableOpacity>
              </ScrollView>
            ) : (
              <View style={styles.emptyState}>
                <MaterialIcons
                  name="people-outline"
                  size={80}
                  color={colors.description}
                />
                <CustomText type="medium" bold style={styles.emptyTitle}>
                  No hay postulaciones
                </CustomText>
                <CustomText type="small" style={styles.emptyMessage}>
                  Aún no se han recibido postulaciones para este partido.
                </CustomText>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </CustomModalView>
  );
};

export default ApplicationsModal;

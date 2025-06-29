import {
  acceptApplicationApi,
  rejectApplicationApi,
} from "@/src/services/match";
import { colors } from "@/src/theme";
import { Application } from "@/src/types/application/Application";
import { ApplicationsModalProps } from "@/src/types/modals/CustomModal";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ApplicationItem from "../ApplicationItem/ApplicationItem";
import CustomText from "../ui/CustomText/CustomText";
import { styles } from "./ApplicationsModal.styles";

const ApplicationsModal: React.FC<ApplicationsModalProps> = ({
  match,
  isOpen,
  closeModal,
}) => {
  const [loading, setLoading] = useState(false);

  if (!match) return null;

  const handleAcceptApplication = async (application: Application) => {
    setLoading(true);
    try {
      await acceptApplicationApi(application.id);
      Alert.alert("Éxito", "Postulación aceptada", [
        { text: "OK", onPress: closeModal },
      ]);
    } catch (error) {
      Alert.alert("Error", "No se pudo aceptar la postulación");
    } finally {
      setLoading(false);
    }
  };

  const handleRejectApplication = async (application: Application) => {
    setLoading(true);
    try {
      await rejectApplicationApi(application.id);
      Alert.alert("Éxito", "Postulación rechazada", [
        { text: "OK", onPress: closeModal },
      ]);
    } catch (error) {
      Alert.alert("Error", "No se pudo rechazar la postulación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      transparent
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
              <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
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
    </Modal>
  );
};

export default ApplicationsModal;

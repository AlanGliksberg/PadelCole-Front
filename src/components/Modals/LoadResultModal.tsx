import React, { useState, useContext } from "react";
import { View, ScrollView } from "react-native";
import { Match, MatchResultForm } from "@/src/types";
import BaseModal from "./BaseModal";
import CustomTextInput from "../ui/CustomTextInput/CustomTextInput";
import CustomText from "../ui/CustomText/CustomText";
import TeamAvatars from "../TeamAvatars/TeamAvatars";
import { parseDateStringToDDMMYYYY } from "@/src/utils/common";
import { styles } from "./LoadResultModal.styles";
import FullButton from "../ui/FullButton/FullButton";
import { parseSets } from "@/src/utils/match";
import { ModalContext } from "@/src/contexts/ModalContext";
import SimpleButton from "../ui/SimpleButton/SimpleButton";

interface LoadResultModalProps {
  isVisible: boolean;
  onClose: () => void;
  match: Match | null;
  onSaveResult?: () => void;
}

const LoadResultModal: React.FC<LoadResultModalProps> = ({
  isVisible,
  onClose,
  match,
  onSaveResult,
}) => {
  const { openModal, openErrorModal } = useContext(ModalContext);
  const [existingResult, setExistingResult] = useState(parseSets(match));
  const [formData, setFormData] = useState<MatchResultForm>({
    team1Set1: existingResult?.team1Set1?.toString(),
    team1Set2: existingResult?.team1Set2?.toString(),
    team1Set3: existingResult?.team1Set3?.toString(),
    team2Set1: existingResult?.team2Set1?.toString(),
    team2Set2: existingResult?.team2Set2?.toString(),
    team2Set3: existingResult?.team2Set3?.toString(),
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof MatchResultForm, value: string) => {
    // Solo permitir números del 0 al 9
    const numericValue = value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({
      ...prev,
      [field]: numericValue,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      //crear servicio que actualiza resultados
      console.log({ formData });
      onSaveResult?.();
      openModal({
        title: existingResult ? "Resultado aceptado" : "Resultado cargado",
        message: existingResult
          ? "El resultado fue aceptado. Próximamente se verá reflejado en tu ranking."
          : "El resultado fue cargado. Ahora hay que esperar a que el otro equipo lo acepte.",
      });
      onClose();
    } catch (error) {
      console.error("Error saving result:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!match) return null;

  const getTeam1Players = () => {
    return match.teams.find((t) => t.teamNumber === 1)!.players;
  };

  const getTeam2Players = () => {
    return match.teams.find((t) => t.teamNumber === 2)!.players;
  };

  const rejectResult = () => {
    setExistingResult(null);
  };

  return (
    <BaseModal
      isVisible={isVisible}
      onClose={onClose}
      title={existingResult ? "Confirmar resultado" : "Cargar resultado"}
    >
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Información del partido */}
        <View style={styles.section}>
          <CustomTextInput
            label="Lugar"
            value={match.location}
            editable={false}
            containerStyle={styles.disabledInput}
          />

          <View style={styles.dateTimeRow}>
            <CustomTextInput
              label="Fecha"
              value={parseDateStringToDDMMYYYY(match.date)}
              editable={false}
              containerStyle={[styles.disabledInput, styles.halfWidth]}
            />
            <CustomTextInput
              label="Hora"
              value={match.time}
              editable={false}
              containerStyle={[styles.disabledInput, styles.halfWidth]}
            />
          </View>
        </View>

        {/* Jugadores */}
        <View style={styles.section}>
          <CustomText type="medium" style={styles.sectionTitle}>
            Jugadores
          </CustomText>

          <View style={styles.teamsContainer}>
            <View style={styles.teamColumn}>
              <CustomText type="small" style={styles.teamLabel}>
                Equipo 1
              </CustomText>
              <TeamAvatars players={getTeam1Players()} match={match} team={1} />
            </View>

            <View style={styles.teamColumn}>
              <CustomText type="small" style={styles.teamLabel}>
                Equipo 2
              </CustomText>
              <TeamAvatars players={getTeam2Players()} match={match} team={2} />
            </View>
          </View>

          {/* Resultados */}
          <View style={styles.resultsContainer}>
            <View style={styles.setRow}>
              <CustomText type="medium" style={styles.setLabel}>
                Set 1
              </CustomText>
              <View style={styles.scoreInputsRow}>
                <CustomTextInput
                  value={formData.team1Set1}
                  onChangeText={(value) =>
                    handleInputChange("team1Set1", value)
                  }
                  containerStyle={styles.scoreInputContainer}
                  style={styles.scoreInput}
                  keyboardType="numeric"
                  maxLength={2}
                />
                <CustomTextInput
                  value={formData.team2Set1}
                  onChangeText={(value) =>
                    handleInputChange("team2Set1", value)
                  }
                  containerStyle={styles.scoreInputContainer}
                  style={styles.scoreInput}
                  keyboardType="numeric"
                  maxLength={2}
                />
              </View>
            </View>

            <View style={styles.setRow}>
              <CustomText type="medium" style={styles.setLabel}>
                Set 2
              </CustomText>
              <View style={styles.scoreInputsRow}>
                <CustomTextInput
                  value={formData.team1Set2}
                  onChangeText={(value) =>
                    handleInputChange("team1Set2", value)
                  }
                  containerStyle={styles.scoreInputContainer}
                  style={styles.scoreInput}
                  keyboardType="numeric"
                  maxLength={2}
                />
                <CustomTextInput
                  value={formData.team2Set2}
                  onChangeText={(value) =>
                    handleInputChange("team2Set2", value)
                  }
                  containerStyle={styles.scoreInputContainer}
                  style={styles.scoreInput}
                  keyboardType="numeric"
                  maxLength={2}
                />
              </View>
            </View>

            <View style={styles.setRow}>
              <CustomText type="medium" style={styles.setLabel}>
                Set 3
              </CustomText>
              <View style={styles.scoreInputsRow}>
                <CustomTextInput
                  value={formData.team1Set3}
                  onChangeText={(value) =>
                    handleInputChange("team1Set3", value)
                  }
                  containerStyle={styles.scoreInputContainer}
                  style={styles.scoreInput}
                  keyboardType="numeric"
                  maxLength={2}
                />
                <CustomTextInput
                  value={formData.team2Set3}
                  onChangeText={(value) =>
                    handleInputChange("team2Set3", value)
                  }
                  containerStyle={styles.scoreInputContainer}
                  style={styles.scoreInput}
                  keyboardType="numeric"
                  maxLength={2}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Botón de guardar */}
        <FullButton onPress={handleSave} size="xl" disabled={isLoading}>
          <CustomText.ButtonText type="medium">
            {isLoading ? "Guardando..." : "Confirmar resultado"}
          </CustomText.ButtonText>
        </FullButton>
        {existingResult && (
          <View style={styles.rejectButton}>
            <SimpleButton title="Rechazar resultado" onPress={rejectResult} />
          </View>
        )}
      </ScrollView>
    </BaseModal>
  );
};

export default LoadResultModal;

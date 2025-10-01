import React, { useState, useContext, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { Match, MatchResult } from "@/src/types";
import BaseModal from "./BaseModal";
import CustomTextInput from "../ui/CustomTextInput/CustomTextInput";
import CustomText from "../ui/CustomText/CustomText";
import TeamAvatars from "../TeamAvatars/TeamAvatars";
import { parseDateStringToDDMMYYYY } from "@/src/utils/common";
import { styles } from "./LoadResultModal.styles";
import FullButton from "../ui/FullButton/FullButton";
import { matchResultIsValid, parseSets } from "@/src/utils/match";
import { ModalContext } from "@/src/contexts/ModalContext";
import SimpleButton from "../ui/SimpleButton/SimpleButton";
import { acceptMatchResult, updateMatchResult } from "@/src/services/match";
import { removeMyResultsCache } from "@/src/services/cache";

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

  const [existingResult, setExistingResult] = useState<MatchResult | null>(
    null
  );
  const [formData, setFormData] = useState<MatchResult>({
    team1Set1: "",
    team1Set2: "",
    team1Set3: "",
    team2Set1: "",
    team2Set2: "",
    team2Set3: "",
  });

  // Actualizar el estado cuando match cambie
  useEffect(() => {
    const currentParsedSets = parseSets(match);
    if (currentParsedSets) {
      setExistingResult(currentParsedSets);
      setFormData({
        team1Set1: currentParsedSets.team1Set1 || "",
        team1Set2: currentParsedSets.team1Set2 || "",
        team1Set3: currentParsedSets.team1Set3 || "",
        team2Set1: currentParsedSets.team2Set1 || "",
        team2Set2: currentParsedSets.team2Set2 || "",
        team2Set3: currentParsedSets.team2Set3 || "",
      });
    } else {
      setExistingResult(null);
      setFormData({
        team1Set1: "",
        team1Set2: "",
        team1Set3: "",
        team2Set1: "",
        team2Set2: "",
        team2Set3: "",
      });
    }
  }, [match]);

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof MatchResult, value: string) => {
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
      if (!matchResultIsValid(formData)) {
        openErrorModal(
          "Cargar resultado",
          "El formato del resultado es incorrecto"
        );
        return;
      }

      if (existingResult) {
        // TODO - si no modifico el resultado, aceptar tambien (pudo haber rechazado sin cambiar nada)
        // aceptar resultado
        const response = await acceptMatchResult(match!.id);
        if (response.error) throw Error(response.message);
      } else {
        const response = await updateMatchResult(match!.id, formData);
        if (response.error) throw Error(response.message);
      }

      removeMyResultsCache();
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
      openErrorModal(
        "Cargar resultado",
        "Hubo un error cargando el resultado. Intenta nuevamente."
      );
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
    // TODO - si se rechaza pero no se cambia nada, tomar como que se acepto
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
                  disabled={!!existingResult}
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
                  disabled={!!existingResult}
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
                  disabled={!!existingResult}
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
                  disabled={!!existingResult}
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
                  disabled={!!existingResult}
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
                  disabled={!!existingResult}
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

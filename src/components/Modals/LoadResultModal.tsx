import React, { useState, useContext, useEffect } from "react";
import { View, ScrollView, Keyboard } from "react-native";
import { Match, MatchResult, Player, Team } from "@/src/types";
import BaseModal from "./BaseModal";
import CustomTextInput from "../ui/CustomTextInput/CustomTextInput";
import CustomText from "../ui/CustomText/CustomText";
import TeamAvatars from "../TeamAvatars/TeamAvatars";
import {
  dateToString,
  parseDateStringToDDMMYYYY,
  timeToString,
} from "@/src/utils/common";
import { styles } from "./LoadResultModal.styles";
import FullButton from "../ui/FullButton/FullButton";
import {
  matchIsFriendly,
  matchResultIsValid,
  parseSets,
} from "@/src/utils/match";
import { ModalContext } from "@/src/contexts/ModalContext";
import SimpleButton from "../ui/SimpleButton/SimpleButton";
import {
  acceptMatchResult,
  createMatchWithResult,
  updateMatchResult,
} from "@/src/services/match";
import {
  removeGetPlayedMatchesCache,
  removeMyResultsCache,
} from "@/src/services/cache";
import CustomTimePicker from "../ui/CustomTimePicker/CustomTimePicker";
import CustomDatePicker from "../ui/CustomDatePicker/CustomDatePicker";
import CustomSelect from "../ui/CustomSelect/CustomSelect";
import useCategories from "@/src/hooks/useCategories";
import useGenders from "@/src/hooks/useGenders";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface LoadResultModalProps {
  isVisible: boolean;
  onClose: () => void;
  match: Match | null;
  onSaveResult?: () => void;
  readOnly: boolean;
}

const LoadResultModal: React.FC<LoadResultModalProps> = ({
  isVisible,
  onClose,
  match,
  onSaveResult,
  readOnly,
}) => {
  const { openModal, openErrorModal } = useContext(ModalContext);
  const [location, setLocation] = useState<string>();
  const [date, setDate] = useState<Date | null>();
  const [time, setTime] = useState<Date | null>();

  const [team1, setTeam1] = useState<Player[]>([]);
  const [team2, setTeam2] = useState<Player[]>([]);

  const { data: genders = [], loading: loadingGenders } = useGenders();
  const { data: allCategories = [], loading: loadingCats } = useCategories();
  const [categories, setCategories] = useState(allCategories);

  const filterCategories = (selectedGender: number) => {
    setCategories(allCategories.filter((c) => c.genderId === selectedGender));
  };

  const [gender, setGender] = useState<number | null>(null);
  const [category, setCategory] = useState<number | null>(null);

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

  const friendlyMatch = matchIsFriendly(match);

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
      if (!match) {
        if (!location || !date || !time) {
          openErrorModal(
            "Cargar resultado",
            "Te faltan algunos datos para completar el partido"
          );
          return;
        }

        if (team1.length < 2 || team2.length < 2) {
          openErrorModal(
            "Cargar resultado",
            "Te faltan algunos jugadores para completar el partido"
          );
          return;
        }
      }

      if (!matchResultIsValid(formData)) {
        openErrorModal(
          "Cargar resultado",
          "El formato del resultado es incorrecto"
        );
        return;
      }

      if (!match) {
        const response = await createMatchWithResult(
          location!,
          dateToString(date!),
          timeToString(time!),
          gender!,
          category!,
          team1,
          team2,
          formData
        );
        if (response.error) throw Error(response.message);
      } else if (existingResult) {
        // TODO - si no modifico el resultado, aceptar tambien (pudo haber rechazado sin cambiar nada)
        // aceptar resultado
        const response = await acceptMatchResult(match!.id);
        if (response.error) throw Error(response.message);
      } else {
        const response = await updateMatchResult(match!.id, formData);
        if (response.error) throw Error(response.message);
      }

      removeMyResultsCache();
      removeGetPlayedMatchesCache();
      onSaveResult?.();
      openModal({
        title: existingResult ? "Resultado aceptado" : "Resultado cargado",
        message: matchIsFriendly(match, team1, team2)
          ? "El resultado fue cargado correctamente"
          : existingResult
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

  const getTeam1Players = () => {
    return match ? match.teams.find((t) => t.teamNumber === 1)!.players : [];
  };

  const getTeam2Players = () => {
    return match ? match.teams.find((t) => t.teamNumber === 2)!.players : [];
  };

  const styleIfWinner = (a: string | undefined, b: string | undefined) => {
    if (!a || !b) return null;
    return a > b ? styles.scoreInputContainerWinner : null;
  };

  const addPlayerToTeam = (player: Player, teamNumber: 1 | 2) => {
    if (teamNumber === 1) setTeam1((prev) => [...prev, player]);
    else setTeam2((prev) => [...prev, player]);
  };

  const removePlayerFromTeam = (player: Player, teamNumber: 1 | 2) => {
    if (teamNumber === 1)
      setTeam1((prev) => prev.filter((p) => p.id !== player.id));
    else setTeam2((prev) => prev.filter((p) => p.id !== player.id));
  };

  const rejectResult = () => {
    // TODO - si se rechaza pero no se cambia nada, tomar como que se acepto
    setExistingResult(null);
  };

  return (
    <BaseModal
      isVisible={isVisible}
      onClose={onClose}
      title={
        match && friendlyMatch
          ? "Resultado"
          : existingResult
          ? "Confirmar resultado"
          : "Cargar resultado"
      }
    >
      <KeyboardAwareScrollView
        enableOnAndroid
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Información del partido */}
        <View style={styles.section}>
          <CustomTextInput
            label="Lugar"
            placeholder="Ubicación del partido"
            value={match ? match?.location : location}
            onChangeText={setLocation}
            editable={!match}
            containerStyle={match && styles.disabledInput}
          />

          <View style={styles.row}>
            {match ? (
              <CustomTextInput
                label="Fecha"
                value={parseDateStringToDDMMYYYY(match.date) || undefined}
                editable={!match}
                containerStyle={[
                  match && styles.disabledInput,
                  styles.halfWidth,
                ]}
              />
            ) : (
              <CustomDatePicker
                label="Fecha"
                placeholder="Fecha"
                onChange={setDate}
                date={date || null}
                inputStyles={styles.halfWidth}
              />
            )}
            {match ? (
              <CustomTextInput
                label="Hora"
                value={match.time}
                editable={false}
                containerStyle={[styles.disabledInput, styles.halfWidth]}
              />
            ) : (
              <CustomTimePicker
                label="Hora"
                placeholder="Hora"
                onChange={setTime}
                time={time || null}
                inputStyles={styles.halfWidth}
              />
            )}
          </View>

          {!match && (
            <View style={styles.row}>
              <CustomSelect
                label="Género"
                data={genders}
                keyExtractor={(item) => item.id.toString()}
                labelExtractor={(item) => item.name}
                value={gender}
                onSelect={(v) => {
                  Keyboard.dismiss();
                  setGender(v);
                  filterCategories(v);
                }}
                placeholder={loadingGenders ? "Cargando..." : "Género"}
                inputStyles={styles.halfWidth}
              />
              <CustomSelect
                label="Categoría"
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                labelExtractor={(item) => item.description}
                value={category}
                onSelect={(v) => {
                  Keyboard.dismiss();
                  setCategory(v);
                }}
                disabled={!gender}
                placeholder={loadingCats ? "Cargando..." : "Categoría"}
                inputStyles={styles.halfWidth}
              />
            </View>
          )}
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
              <TeamAvatars
                players={getTeam1Players()}
                match={match || undefined}
                team={1}
                isCreator={!match}
                callback={async (p: Player) => addPlayerToTeam(p, 1)}
                canDelete
                removeCallback={async (p: Player) => removePlayerFromTeam(p, 1)}
              />
            </View>

            <View style={styles.teamColumn}>
              <CustomText type="small" style={styles.teamLabel}>
                Equipo 2
              </CustomText>
              <TeamAvatars
                players={getTeam2Players()}
                match={match || undefined}
                team={2}
                isCreator={!match}
                callback={async (p: Player) => addPlayerToTeam(p, 2)}
                canDelete
                removeCallback={async (p: Player) => removePlayerFromTeam(p, 2)}
              />
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
                  containerStyle={[
                    styles.scoreInputContainer,
                    styleIfWinner(formData.team1Set1, formData.team2Set1),
                  ]}
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
                  containerStyle={[
                    styles.scoreInputContainer,
                    styleIfWinner(formData.team2Set1, formData.team1Set1),
                  ]}
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
                  containerStyle={[
                    styles.scoreInputContainer,
                    styleIfWinner(formData.team1Set2, formData.team2Set2),
                  ]}
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
                  containerStyle={[
                    styles.scoreInputContainer,
                    styleIfWinner(formData.team2Set2, formData.team1Set2),
                  ]}
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
                  containerStyle={[
                    styles.scoreInputContainer,
                    styleIfWinner(formData.team1Set3, formData.team2Set3),
                  ]}
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
                  containerStyle={[
                    styles.scoreInputContainer,
                    styleIfWinner(formData.team2Set3, formData.team1Set3),
                  ]}
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
        {!readOnly && (
          <>
            <FullButton onPress={handleSave} size="xl" disabled={isLoading}>
              <CustomText.ButtonText type="medium">
                {isLoading ? "Guardando..." : "Confirmar resultado"}
              </CustomText.ButtonText>
            </FullButton>
            {existingResult && (
              <View style={styles.rejectButton}>
                <SimpleButton
                  title="Rechazar resultado"
                  onPress={rejectResult}
                />
              </View>
            )}
          </>
        )}
      </KeyboardAwareScrollView>
    </BaseModal>
  );
};

export default LoadResultModal;

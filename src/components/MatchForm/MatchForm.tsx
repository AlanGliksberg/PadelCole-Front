import React from "react";
import { Controller, Resolver, useForm } from "react-hook-form";
import { View } from "react-native";

import useCategories from "@/src/hooks/useCategories";
import useGenders from "@/src/hooks/useGenders";
import { matchSchema } from "@/src/schemas/matchSchema";
import { MatchFormValues, Player } from "@/src/types";
import { matchFormDefaultValues } from "@/src/types/forms/MatchForm";
import { CreateTeam } from "@/src/types/player/Team";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomDatePicker from "../ui/CustomDatePicker/CustomDatePicker";
import CustomSelect from "../ui/CustomSelect/CustomSelect";
import CustomText from "../ui/CustomText/CustomText";
import CustomTextInput from "../ui/CustomTextInput/CustomTextInput";
import CustomTimePicker from "../ui/CustomTimePicker/CustomTimePicker";
import FullButton from "../ui/FullButton/FullButton";
import CourtDistribution from "./CourtDistribution";
import { styles } from "./MatchForm.styles";

export type MatchFormProps = {
  initialValues?: MatchFormValues;
  onSubmit: (values: MatchFormValues) => void;
};

const MatchForm: React.FC<MatchFormProps> = ({ initialValues, onSubmit }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MatchFormValues>({
    defaultValues: initialValues || matchFormDefaultValues,
    resolver: yupResolver(matchSchema) as Resolver<MatchFormValues>,
  });

  const { data: genders = [], loading: loadingGenders } = useGenders();
  const { data: allCategories = [], loading: loadingCats } = useCategories();

  const selectedGender = watch("genderId");
  const categories = allCategories.filter((c) => c.genderId === selectedGender);

  const getNewTeams = (
    teams: CreateTeam[] = [],
    player: Player,
    teamNumber: 1 | 2,
    playerIndex: number
  ) => {
    const updatedTeams = [...teams];
    let team = updatedTeams.find((t) => t.teamNumber === teamNumber);
    if (!team) {
      team = {
        teamNumber: teamNumber,
        players: [],
      };
      updatedTeams.push(team);
    }

    team.players.push(player);
    return updatedTeams;
  };

  const getNewTeamsWithoutPlayer = (
    teams: CreateTeam[] = [],
    player: Player,
    teamNumber: 1 | 2
  ) => {
    const updatedTeams = [...teams];
    let team = updatedTeams.find((t) => t.teamNumber === teamNumber)!;
    team.players = team.players.filter((p) => p.id !== player.id);
    return updatedTeams;
  };

  return (
    <View style={styles.form}>
      <View style={styles.card}>
        <CustomText.Title>Detalles</CustomText.Title>

        {/* Nombre */}
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <CustomTextInput
              label="Nombre"
              value={value}
              onChangeText={onChange}
              placeholder="Nombre o ubicación"
              error={errors.name?.message}
              mandatory
            />
          )}
        />

        {/* Descripción */}
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <CustomTextInput
              label="Descripción"
              value={value}
              onChangeText={onChange}
              placeholder="Dirección o detalles"
              error={errors.description?.message}
            />
          )}
        />

        {/* Fecha */}
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <CustomDatePicker
              onChange={onChange}
              date={value}
              minimumDate={new Date()}
              mandatory
              placeholder="Fecha del partido"
              error={errors.date?.message}
            />
          )}
        />

        {/* Hora */}
        <Controller
          control={control}
          name="time"
          render={({ field: { onChange, value } }) => (
            <CustomTimePicker
              onChange={onChange}
              time={value}
              mandatory
              placeholder="Hora del partido"
              error={errors.time?.message}
            />
          )}
        />

        {/* Duración */}
        <Controller
          control={control}
          name="duration"
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              label="Duración"
              data={[
                { id: 60, name: "60 minutos" },
                { id: 90, name: "90 minutos" },
                { id: 120, name: "120 minutos" },
              ]}
              keyExtractor={(item) => item.id.toString()}
              labelExtractor={(item) => item.name}
              value={value}
              onSelect={onChange}
              error={errors.duration?.message}
              mandatory
              placeholder="Duración del partido"
            />
          )}
        />

        {/* Género */}
        <Controller
          control={control}
          name="genderId"
          rules={{ required: "El género es obligatorio" }}
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              label="Género"
              data={genders}
              keyExtractor={(item) => item.id.toString()}
              labelExtractor={(item) => item.name}
              value={value}
              onSelect={onChange}
              placeholder={
                loadingGenders ? "Cargando..." : "Género del partido"
              }
              error={errors.genderId?.message}
              mandatory
            />
          )}
        />

        {/* Categoría */}
        <Controller
          control={control}
          name="categoryId"
          rules={{ required: "La categoría es obligatoria" }}
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              label="Categoría"
              data={categories}
              keyExtractor={(item) => item.id.toString()}
              labelExtractor={(item) => item.code}
              value={value}
              onSelect={onChange}
              disabled={!selectedGender}
              placeholder={
                !selectedGender
                  ? "Primero elegí el género"
                  : loadingCats
                  ? "Cargando..."
                  : "Categoría del partido"
              }
              error={errors.categoryId?.message}
              mandatory
            />
          )}
        />

        {/* Jugadores */}
        <View style={styles.teamsContainer}>
          <Controller
            control={control}
            name="teams"
            render={({ field: { onChange, value } }) => (
              <CourtDistribution
                teams={value}
                onPlayerAdd={(player, teamNumber, playerIndex) => {
                  const teams = getNewTeams(
                    value,
                    player,
                    teamNumber,
                    playerIndex
                  );
                  onChange(teams);
                }}
                onPlayerRemove={(player, teamNumber) => {
                  const teams = getNewTeamsWithoutPlayer(
                    value,
                    player,
                    teamNumber
                  );
                  onChange(teams);
                }}
              />
            )}
          />
        </View>
      </View>

      {/* Botón de guardar */}
      <FullButton onPress={handleSubmit(onSubmit)} style={styles.button}>
        <CustomText.ButtonText type="medium">
          Guardar partido
        </CustomText.ButtonText>
      </FullButton>
    </View>
  );
};

export default MatchForm;

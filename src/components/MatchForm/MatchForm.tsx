import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import useCategories from "@/src/hooks/useCategories";
import useGenders from "@/src/hooks/useGenders";
import CustomDatePicker from "../ui/CustomDatePicker/CustomDatePicker";
import CustomSelect from "../ui/CustomSelect/CustomSelect";
import CustomText from "../ui/CustomText/CustomText";
import CustomTextInput from "../ui/CustomTextInput/CustomTextInput";
import CustomTimePicker from "../ui/CustomTimePicker/CustomTimePicker";
import FullButton from "../ui/FullButton/FullButton";
import { styles } from "./MatchForm.styles";

export interface MatchFormValues {
  name: string;
  description?: string;
  date: Date | null;
  time: Date | null;
  duration: 60 | 90 | 120;
  genderId: number;
  categoryId: number;
}

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
    defaultValues: initialValues || {
      name: "",
      description: "",
      date: null,
      time: null,
      duration: 90,
      genderId: 0,
      categoryId: 0,
    },
  });

  const { data: genders = [], loading: loadingGenders } = useGenders();
  const { data: allCategories = [], loading: loadingCats } = useCategories();

  const selectedGender = watch("genderId");
  const categories = allCategories.filter((c) => c.genderId === selectedGender);

  return (
    <View style={styles.form}>
      <View style={styles.card}>
        <CustomText.Title>Detalles</CustomText.Title>

        {/* Nombre */}
        <Controller
          control={control}
          name="name"
          rules={{ required: "El nombre es obligatorio" }}
          render={({ field: { onChange, value } }) => (
            <CustomTextInput
              label="Nombre/Ubicación"
              value={value}
              onChangeText={onChange}
              placeholder="Escribí un nombre"
              error={errors.name?.message}
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
              placeholder="Agregá detalles"
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
            />
          )}
        />

        {/* Hora */}
        <Controller
          control={control}
          name="time"
          render={({ field: { onChange, value } }) => (
            <CustomTimePicker onChange={onChange} time={value} />
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
                  : "Seleccioná la categoría"
              }
              error={errors.categoryId?.message}
            />
          )}
        />
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

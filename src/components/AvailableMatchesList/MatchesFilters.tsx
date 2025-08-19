import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CustomSearchInput from "@/src/components/ui/CustomSearchInput/CustomSearchInput";
import CustomDatePicker from "@/src/components/ui/CustomDatePicker/CustomDatePicker";
import CustomTimePicker from "@/src/components/ui/CustomTimePicker/CustomTimePicker";
import CustomSelect from "@/src/components/ui/CustomSelect/CustomSelect";
import { colors } from "@/src/theme";
import { styles } from "./MatchesFilters.styles";
import useGenders from "@/src/hooks/useGenders";
import useCategories from "@/src/hooks/useCategories";
import { DURATIONS } from "@/src/constants/match";
import { MatchFilters } from "@/src/types";

interface MatchesFiltersProps {
  onFiltersChange?: (filters: MatchFilters) => void;
}

const MatchesFilters: React.FC<MatchesFiltersProps> = ({ onFiltersChange }) => {
  const [search, setSearch] = useState<string | null>("");
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [timeFrom, setTimeFrom] = useState<Date | null>(null);
  const [timeTo, setTimeTo] = useState<Date | null>(null);
  const [gender, setGender] = useState<number | null>(null);
  const [category, setCategory] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  const { data: genders = [], loading: loadingGenders } = useGenders();
  const { data: allCategories = [], loading: loadingCategories } =
    useCategories();

  // Filtrar categorías basadas en el género seleccionado
  const categories = gender
    ? allCategories.filter((cat) => cat.genderId === gender)
    : allCategories;

  const handleSearch = (searchTerm: string) => {
    const newFilters = {
      description: searchTerm || null,
      dateFrom,
      dateTo,
      timeFrom,
      timeTo,
      gender,
      category,
      duration,
    };

    setSearch(searchTerm || null);
    onFiltersChange?.(newFilters);
  };

  const handleGenderChange = (value: number | null) => {
    // Verificar si la categoría actual está disponible para el nuevo género
    const newCategories = value
      ? allCategories.filter((cat) => cat.genderId === value)
      : allCategories;
    const isCategoryAvailable =
      category && newCategories.some((cat) => cat.id === category);

    // Solo resetear la categoría si no está disponible para el nuevo género
    const newCategory = isCategoryAvailable ? category : null;

    const newFilters = {
      description: search,
      dateFrom,
      dateTo,
      timeFrom,
      timeTo,
      gender: value,
      category: newCategory,
      duration,
    };

    setGender(value);
    setCategory(newCategory);
    onFiltersChange?.(newFilters);
  };

  const handleCategoryChange = (value: number | null) => {
    const newFilters = {
      description: search,
      dateFrom,
      dateTo,
      timeFrom,
      timeTo,
      gender,
      category: value,
      duration,
    };

    setCategory(value);
    onFiltersChange?.(newFilters);
  };

  const handleDurationChange = (value: number | null) => {
    const newFilters = {
      description: search,
      dateFrom,
      dateTo,
      timeFrom,
      timeTo,
      gender,
      category,
      duration: value,
    };

    setDuration(value);
    onFiltersChange?.(newFilters);
  };

  const handleDateFromChange = (newDateFrom: Date | null) => {
    setDateFrom(newDateFrom);
    onFiltersChange?.({
      description: search,
      dateFrom: newDateFrom,
      dateTo,
      timeFrom,
      timeTo,
      gender,
      category,
      duration,
    });
  };

  const handleDateToChange = (newDateTo: Date | null) => {
    setDateTo(newDateTo);
    onFiltersChange?.({
      description: search,
      dateFrom,
      dateTo: newDateTo,
      timeFrom,
      timeTo,
      gender,
      category,
      duration,
    });
  };

  const handleTimeFromChange = (newTimeFrom: Date | null) => {
    setTimeFrom(newTimeFrom);
    onFiltersChange?.({
      description: search,
      dateFrom,
      dateTo,
      timeFrom: newTimeFrom,
      timeTo,
      gender,
      category,
      duration,
    });
  };

  const handleTimeToChange = (newTimeTo: Date | null) => {
    setTimeTo(newTimeTo);
    onFiltersChange?.({
      description: search,
      dateFrom,
      dateTo,
      timeFrom,
      timeTo: newTimeTo,
      gender,
      category,
      duration,
    });
  };

  return (
    <View>
      <CustomSearchInput
        placeholder="Buscá un partido"
        startSearchingOn={3}
        onSearch={handleSearch}
        onClear={() => handleSearch("")}
      />
      <View style={styles.filtersRow}>
        <MaterialIcons
          name="filter-list"
          size={32}
          color={colors.primary}
          style={{ marginTop: 22 }}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filtersList}>
            <View style={styles.filterItem}>
              <CustomSelect
                label=""
                data={genders}
                value={gender}
                onSelect={handleGenderChange}
                keyExtractor={(item) => item.id.toString()}
                labelExtractor={(item) => item.name}
                placeholder={loadingGenders ? "Cargando..." : "Género"}
                disabled={loadingGenders}
                inputStyles={gender ? styles.selected : {}}
                withReset
              />
            </View>
            <View style={styles.filterItem}>
              <CustomSelect
                label=""
                data={categories}
                value={category}
                onSelect={handleCategoryChange}
                keyExtractor={(item) => item.id.toString()}
                labelExtractor={(item) => item.description}
                placeholder={loadingCategories ? "Cargando..." : "Categoría"}
                disabled={loadingCategories}
                inputStyles={category ? styles.selected : {}}
                withReset
              />
            </View>
            <View style={[styles.filterItem, { marginTop: 26 }]}>
              <CustomDatePicker
                date={dateFrom}
                onChange={handleDateFromChange}
                placeholder="Fecha desde"
                minimumDate={new Date()}
                inputStyles={dateFrom ? styles.selected : {}}
                neutralButtonLabel="Restablecer"
              />
            </View>
            <View style={[styles.filterItem, { marginTop: 26 }]}>
              <CustomDatePicker
                date={dateTo}
                onChange={handleDateToChange}
                placeholder="Fecha hasta"
                minimumDate={dateFrom || new Date()}
                inputStyles={dateTo ? styles.selected : {}}
                neutralButtonLabel="Restablecer"
              />
            </View>
            <View style={[styles.filterItem, { marginTop: 26 }]}>
              <CustomTimePicker
                time={timeFrom}
                onChange={handleTimeFromChange}
                placeholder="Hora desde"
                inputStyles={timeFrom ? styles.selected : {}}
                neutralButtonLabel="Restablecer"
              />
            </View>
            <View style={[styles.filterItem, { marginTop: 26 }]}>
              <CustomTimePicker
                time={timeTo}
                onChange={handleTimeToChange}
                placeholder="Hora hasta"
                inputStyles={timeTo ? styles.selected : {}}
                neutralButtonLabel="Restablecer"
              />
            </View>
            <View style={styles.filterItem}>
              <CustomSelect
                label=""
                data={DURATIONS}
                value={duration}
                onSelect={handleDurationChange}
                keyExtractor={(item) => item.id.toString()}
                labelExtractor={(item) => item.name}
                placeholder="Duración"
                inputStyles={duration ? styles.selected : {}}
                withReset
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MatchesFilters;

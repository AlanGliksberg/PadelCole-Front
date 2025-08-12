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

interface MatchesFiltersProps {
  onSearch?: (search: string) => void;
  onFiltersChange?: (filters: {
    fecha: Date | null;
    hora: Date | null;
    genero: number | null;
    categoria: number | null;
    duracion: number | null;
  }) => void;
}

const MatchesFilters: React.FC<MatchesFiltersProps> = ({
  onSearch,
  onFiltersChange,
}) => {
  const [search, setSearch] = useState("");
  const [fecha, setFecha] = useState<Date | null>(null);
  const [hora, setHora] = useState<Date | null>(null);
  const [genero, setGenero] = useState<number | null>(null);
  const [categoria, setCategoria] = useState<number | null>(null);
  const [duracion, setDuracion] = useState<number | null>(null);

  const { data: generos = [], loading: loadingGenders } = useGenders();
  const { data: allCategories = [], loading: loadingCategories } =
    useCategories();

  // Filtrar categorías basadas en el género seleccionado
  const categorias = genero
    ? allCategories.filter((cat) => cat.genderId === genero)
    : allCategories;

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    onSearch?.(searchTerm);
  };

  const handleFilterChange = (filterType: string, value: number | null) => {
    let newFilters;
    switch (filterType) {
      case "genero":
        newFilters = { fecha, hora, genero: value, categoria, duracion };
        setGenero(value);
        // Limpiar categoría cuando cambia el género
        setCategoria(null);
        break;
      case "categoria":
        newFilters = { fecha, hora, genero, categoria: value, duracion };
        setCategoria(value);
        break;
      case "duracion":
        newFilters = { fecha, hora, genero, categoria, duracion: value };
        setDuracion(value);
        break;
      default:
        return;
    }
    onFiltersChange?.(newFilters);
  };

  const handleFechaChange = (newFecha: Date | null) => {
    setFecha(newFecha);
    onFiltersChange?.({ fecha: newFecha, hora, genero, categoria, duracion });
  };

  const handleHoraChange = (newHora: Date | null) => {
    setHora(newHora);
    onFiltersChange?.({ fecha, hora: newHora, genero, categoria, duracion });
  };

  return (
    <View>
      <CustomSearchInput
        placeholder="Buscar partido"
        startSearchingOn={3}
        onSearch={handleSearch}
        value={search}
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
            <View style={[styles.filterItem, { marginTop: 26 }]}>
              <CustomDatePicker
                date={fecha}
                onChange={handleFechaChange}
                placeholder="Fecha"
                minimumDate={new Date()}
                inputStyles={fecha ? styles.selected : {}}
                neutralButtonLabel="Restablecer"
              />
            </View>
            <View style={[styles.filterItem, { marginTop: 25 }]}>
              <CustomTimePicker
                time={hora}
                onChange={handleHoraChange}
                placeholder="Hora"
                inputStyles={hora ? styles.selected : {}}
                neutralButtonLabel="Restablecer"
              />
            </View>
            <View style={styles.filterItem}>
              <CustomSelect
                label=""
                data={generos}
                value={genero}
                onSelect={(value) => handleFilterChange("genero", value)}
                keyExtractor={(item) => item.id.toString()}
                labelExtractor={(item) => item.name}
                placeholder={loadingGenders ? "Cargando..." : "Género"}
                disabled={loadingGenders}
                inputStyles={genero ? styles.selected : {}}
                withReset
              />
            </View>
            <View style={styles.filterItem}>
              <CustomSelect
                label=""
                data={categorias}
                value={categoria}
                onSelect={(value) => handleFilterChange("categoria", value)}
                keyExtractor={(item) => item.id.toString()}
                labelExtractor={(item) => item.description}
                placeholder={loadingCategories ? "Cargando..." : "Categoría"}
                disabled={loadingCategories}
                inputStyles={categoria ? styles.selected : {}}
                withReset
              />
            </View>
            <View style={styles.filterItem}>
              <CustomSelect
                label=""
                data={DURATIONS}
                value={duracion}
                onSelect={(value) => handleFilterChange("duracion", value)}
                keyExtractor={(item) => item.id.toString()}
                labelExtractor={(item) => item.name}
                placeholder="Duración"
                inputStyles={duracion ? styles.selected : {}}
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

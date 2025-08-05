import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CustomSearchInput from "@/src/components/ui/CustomSearchInput/CustomSearchInput";
import CustomDatePicker from "@/src/components/ui/CustomDatePicker/CustomDatePicker";
import CustomTimePicker from "@/src/components/ui/CustomTimePicker/CustomTimePicker";
import CustomSelect from "@/src/components/ui/CustomSelect/CustomSelect";
import CustomText from "@/src/components/ui/CustomText/CustomText";
import { colors } from "@/src/theme";
import { styles } from "./AvailableMatchesList.styles";

const generos = [
  { id: 1, name: "Masculino" },
  { id: 2, name: "Femenino" },
  { id: 3, name: "Mixto" },
];
const categorias = [
  { id: 1, code: "A" },
  { id: 2, code: "B" },
  { id: 3, code: "C" },
];
const duraciones = [
  { id: 60, name: "60 min" },
  { id: 90, name: "90 min" },
  { id: 120, name: "120 min" },
];

const AvailableMatchesList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [fecha, setFecha] = useState<Date | null>(null);
  const [hora, setHora] = useState<Date | null>(null);
  const [genero, setGenero] = useState<number | null>(null);
  const [categoria, setCategoria] = useState<number | null>(null);
  const [duracion, setDuracion] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      {/* Input de búsqueda y filtros dentro del mismo fondo de card */}
      <View style={styles.filtersCard}>
        <CustomSearchInput
          placeholder="Buscar partido"
          onSearch={setSearch}
          value={search}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 8 }}
        >
          <TouchableOpacity
            style={{ justifyContent: "center", marginRight: 8 }}
          >
            <MaterialIcons
              name="filter-list"
              size={28}
              color={colors.primary}
            />
          </TouchableOpacity>
          <View style={styles.filterItem}>
            <CustomDatePicker
              date={fecha}
              onChange={setFecha}
              placeholder="Fecha"
            />
          </View>
          <View style={styles.filterItem}>
            <CustomTimePicker
              time={hora}
              onChange={setHora}
              placeholder="Horario"
            />
          </View>
          <View style={styles.filterItem}>
            <CustomSelect
              label="Género"
              data={generos}
              value={genero}
              onSelect={setGenero}
              keyExtractor={(item) => item.id.toString()}
              labelExtractor={(item) => item.name}
              placeholder="Género"
            />
          </View>
          <View style={styles.filterItem}>
            <CustomSelect
              label="Categoría"
              data={categorias}
              value={categoria}
              onSelect={setCategoria}
              keyExtractor={(item) => item.id.toString()}
              labelExtractor={(item) => item.code}
              placeholder="Categoría"
            />
          </View>
          <View style={styles.filterItem}>
            <CustomSelect
              label="Duración"
              data={duraciones}
              value={duracion}
              onSelect={setDuracion}
              keyExtractor={(item) => item.id.toString()}
              labelExtractor={(item) => item.name}
              placeholder="Duración"
            />
          </View>
        </ScrollView>
      </View>
      {/* Lista dummy de partidos */}
      <CustomText type="body" bold>
        Lista de Partidos (dummy)
      </CustomText>
      <CustomText type="body">- Partido 1</CustomText>
      <CustomText type="body">- Partido 2</CustomText>
      <CustomText type="body">- Partido 3</CustomText>
    </View>
  );
};

export default AvailableMatchesList;

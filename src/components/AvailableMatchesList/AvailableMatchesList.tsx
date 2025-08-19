import React from "react";
import { View } from "react-native";
import CustomText from "@/src/components/ui/CustomText/CustomText";
import { styles } from "./AvailableMatchesList.styles";
import MatchesFilters from "./MatchesFilters";

const AvailableMatchesList: React.FC = () => {
  const handleSearch = (search: string) => {
    // Aquí puedes manejar la búsqueda
    console.log("Búsqueda:", search);
  };

  const handleFiltersChange = (filters: {
    dateFrom: Date | null;
    dateTo: Date | null;
    timeFrom: Date | null;
    timeTo: Date | null;
    gender: number | null;
    category: number | null;
    duration: number | null;
  }) => {
    // Aquí puedes manejar los cambios de filtros
    // console.log("Filtros cambiados:", filters);
  };

  return (
    <View style={styles.container}>
      {/* Input de búsqueda y filtros dentro del mismo fondo de card */}
      <View style={styles.filtersCard}>
        <MatchesFilters
          onSearch={handleSearch}
          onFiltersChange={handleFiltersChange}
        />
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

import { CustomText } from "@/src/components";
import { colors } from "@/src/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { styles } from "./PlayersList.styles";

const EmptyState: React.FC = () => {
  return (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="search" size={90} color={colors.primary} />
      <CustomText style={styles.emptyText}>
        Ajustá los filtros para encontrar jugadores
      </CustomText>
    </View>
  );
};

export default EmptyState;

import { colors } from "@/src/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import CustomText from "../ui/CustomText/CustomText";
import { styles } from "./NewPlayerForm.styles";

interface NewPlayerFormProps {
  onAddNewPlayer: () => void;
}

const NewPlayerForm: React.FC<NewPlayerFormProps> = ({ onAddNewPlayer }) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="person-add" size={64} color={colors.description} />
      <CustomText style={styles.description} type="body">
        Crear perfil e invitar a un jugador nuevo
      </CustomText>
      <TouchableOpacity style={styles.addButton} onPress={onAddNewPlayer}>
        <MaterialIcons name="add" size={20} color={colors.white} />
        <CustomText style={styles.addButtonText} bold>
          Crear nuevo jugador
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default NewPlayerForm;

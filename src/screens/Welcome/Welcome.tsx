import { CustomText, FullButton } from "@/src/components";
import { AuthContext } from "@/src/contexts/AuthContext";
import { colors } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useContext } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { styles } from "./Welcome.styles";

const Welcome: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const handleBack = () => {
    logout();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back" size={18} color={colors.primary} />
        <CustomText type="small" style={styles.buttonText}>
          Volver
        </CustomText>
      </TouchableOpacity>
      <CustomText type="h1" style={styles.title} bold>
        ¡Bienvenido a PlayConnect!
      </CustomText>
      <CustomText type="body" style={styles.subtitle}>
        Estamos creando la comunidad más grande de pádel en Argentina
      </CustomText>
      <View style={styles.card}>
        <View style={styles.list}>
          <View style={styles.item}>
            <CustomText type="body" bold style={styles.itemsHeaderText}>
              En nuestra app queremos ayudarte a:
            </CustomText>
          </View>
          <View style={styles.item}>
            <Ionicons name="search" size={24} style={styles.icon} />
            <View style={styles.itemText}>
              <CustomText type="body" style={styles.itemTitle}>
                Buscar partidos cerca tuyo
              </CustomText>
              <CustomText type="body">
                Encontrá jugadores disponibles cuando tengas ganas de jugar
              </CustomText>
            </View>
          </View>

          <View style={styles.item}>
            <Ionicons name="people" size={24} style={styles.icon} />
            <View style={styles.itemText}>
              <CustomText style={styles.itemTitle} type="body">
                Encontrar jugadores de tu nivel
              </CustomText>
              <CustomText type="body">
                Cuando te falte uno podés encontrar gente con un nivel similar
                al tuyo
              </CustomText>
            </View>
          </View>

          <View style={styles.item}>
            <Ionicons name="time" size={24} style={styles.icon} />
            <View style={styles.itemText}>
              <CustomText style={styles.itemTitle} type="body">
                Registrar tu historial
              </CustomText>
              <CustomText type="body">
                Llevá un seguimiento de todos tus partidos jugados con amigos y
                compañeros
              </CustomText>
            </View>
          </View>
        </View>

        <View>
          <CustomText type="body">
            Vamos a generar un sistema de categorías similar al que ya conocés,
            calculado con puntos que irán sumando y restando según los
            resultados de tus partidos.
          </CustomText>
          <CustomText bold>
            Para empezar, necesitamos que nos brindes algunos datos sobre tu
            nivel de juego.
          </CustomText>
        </View>
      </View>
      <FullButton
        style={styles.button}
        onPress={() => {
          /* navegar */
        }}
      >
        <CustomText.ButtonText type="medium">
          Declarar mi categoría
        </CustomText.ButtonText>
        <AntDesign name="arrowright" size={20} color={colors.white} />
      </FullButton>
    </ScrollView>
  );
};

export default Welcome;

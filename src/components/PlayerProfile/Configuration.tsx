import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import CustomText from "@/src/components/ui/CustomText/CustomText";
import { colors } from "@/src/theme";
import { styles } from "./PlayerProfile.styles";

interface ConfigurationProps {
  onLogout: () => void;
  onChangePassword: () => void;
}

export default function Configuration({
  onLogout,
  onChangePassword,
}: ConfigurationProps) {
  return (
    <View style={styles.tabContent}>
      <View style={styles.section}>
        <CustomText style={styles.sectionTitle}>Configuración</CustomText>

        <View style={styles.configurationContainer}>
          <TouchableOpacity
            style={styles.configButton}
            onPress={onChangePassword}
          >
            <View style={styles.configButtonContent}>
              <MaterialIcons name="lock" size={20} color={colors.primary} />
              <CustomText style={styles.configButtonText}>
                Cambiar contraseña
              </CustomText>
            </View>
            <MaterialIcons
              name="chevron-right"
              size={20}
              color={colors.description}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.configButtonLogout}
            onPress={onLogout}
          >
            <View style={styles.configButtonContent}>
              <MaterialIcons name="logout" size={20} color={colors.error} />
              <CustomText style={styles.configButtonTextLogout}>
                Cerrar sesión
              </CustomText>
            </View>
            <MaterialIcons
              name="chevron-right"
              size={20}
              color={colors.description}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

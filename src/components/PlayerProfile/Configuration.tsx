import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";

import CustomText from "@/src/components/ui/CustomText/CustomText";
import { colors } from "@/src/theme";
import { styles } from "./PlayerProfile.styles";
import { AuthContext } from "@/src/contexts/AuthContext";
import { PlayerModalsContext } from "@/src/contexts/PlayerModalsContext";
import { ModalContext } from "@/src/contexts/ModalContext";

export default function Configuration() {
  const { logout } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const { openChangePasswordModal } = useContext(PlayerModalsContext);
  const { openModal } = useContext(ModalContext);

  const handleLogout = () => {
    openModal({
      title: "Cerrar sesión",
      message: "¿Estás seguro que querés cerrar sesión?",
      primaryAction: logout,
      primaryLabel: "Cerrar sesión",
    });
  };

  const handleChangePassword = () => {
    if (user?.googleId) {
      openModal({
        title: "Cambiar contraseña",
        message:
          "No podés cambiar la contraseña porque está asociada a tu cuenta Google",
        primaryLabel: "Aceptar",
      });
    } else {
      openChangePasswordModal();
    }
  };

  return (
    <View style={styles.tabContent}>
      <View style={styles.section}>
        <CustomText style={styles.sectionTitle}>Configuración</CustomText>

        <View style={styles.configurationContainer}>
          <TouchableOpacity
            style={styles.configButton}
            onPress={handleChangePassword}
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
            onPress={handleLogout}
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

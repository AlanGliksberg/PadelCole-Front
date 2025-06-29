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
        <CustomText style={styles.sectionTitle}>
          Configuración de Cuenta
        </CustomText>

        <View style={{ gap: 8 }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
              backgroundColor: colors.surface,
              borderRadius: 8,
            }}
            onPress={onChangePassword}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <MaterialIcons name="lock" size={20} color={colors.description} />
              <CustomText style={{ fontSize: 16, color: colors.text }}>
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
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
              backgroundColor: colors.surface,
              borderRadius: 8,
            }}
            onPress={onLogout}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <MaterialIcons name="logout" size={20} color={colors.error} />
              <CustomText style={{ fontSize: 16, color: colors.error }}>
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

      <View style={styles.section}>
        <CustomText style={styles.sectionTitle}>
          Información de la App
        </CustomText>

        <View style={{ gap: 8 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
              backgroundColor: colors.surface,
              borderRadius: 8,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <MaterialIcons name="info" size={20} color={colors.description} />
              <CustomText style={{ fontSize: 16, color: colors.text }}>
                Versión
              </CustomText>
            </View>
            <CustomText style={{ fontSize: 16, color: colors.description }}>
              1.0.0
            </CustomText>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
              backgroundColor: colors.surface,
              borderRadius: 8,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <MaterialIcons
                name="description"
                size={20}
                color={colors.description}
              />
              <CustomText style={{ fontSize: 16, color: colors.text }}>
                Términos y condiciones
              </CustomText>
            </View>
            <MaterialIcons
              name="chevron-right"
              size={20}
              color={colors.description}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
              backgroundColor: colors.surface,
              borderRadius: 8,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <MaterialIcons
                name="privacy-tip"
                size={20}
                color={colors.description}
              />
              <CustomText style={{ fontSize: 16, color: colors.text }}>
                Política de privacidad
              </CustomText>
            </View>
            <MaterialIcons
              name="chevron-right"
              size={20}
              color={colors.description}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

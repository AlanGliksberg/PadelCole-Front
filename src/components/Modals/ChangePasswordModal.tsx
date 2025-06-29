import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Modal, TouchableOpacity, View } from "react-native";
import * as yup from "yup";

import CustomText from "@/src/components/ui/CustomText/CustomText";
import CustomTextInput from "@/src/components/ui/CustomTextInput/CustomTextInput";
import FullButton from "@/src/components/ui/FullButton/FullButton";
import { colors } from "@/src/theme";
import { styles } from "./ChangePasswordModal.styles";

const changePasswordSchema = yup.object({
  currentPassword: yup.string().required("La contraseña actual es requerida"),
  newPassword: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La nueva contraseña es requerida"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Las contraseñas no coinciden")
    .required("Confirma la nueva contraseña"),
});

type ChangePasswordFormData = yup.InferType<typeof changePasswordSchema>;

interface ChangePasswordModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  isVisible,
  onClose,
}: ChangePasswordModalProps) {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      setLoading(true);

      // TODO: Implementar el servicio para cambiar contraseña
      console.log("Cambiando contraseña:", data);

      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert("Éxito", "Tu contraseña ha sido cambiada correctamente", [
        { text: "OK", onPress: handleClose },
      ]);
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo cambiar la contraseña. Inténtalo de nuevo.",
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <CustomText style={styles.title}>Cambiar Contraseña</CustomText>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Controller
              control={control}
              name="currentPassword"
              render={({ field: { onChange, value } }) => (
                <CustomTextInput
                  label="Contraseña actual"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  error={errors.currentPassword?.message}
                  placeholder="Ingresa tu contraseña actual"
                />
              )}
            />

            <Controller
              control={control}
              name="newPassword"
              render={({ field: { onChange, value } }) => (
                <CustomTextInput
                  label="Nueva contraseña"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  error={errors.newPassword?.message}
                  placeholder="Ingresa tu nueva contraseña"
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <CustomTextInput
                  label="Confirmar nueva contraseña"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  error={errors.confirmPassword?.message}
                  placeholder="Confirma tu nueva contraseña"
                />
              )}
            />
          </View>

          <View style={styles.footer}>
            <FullButton onPress={handleSubmit(onSubmit)} disabled={loading}>
              <CustomText style={styles.buttonText}>
                {loading ? "Cambiando..." : "Cambiar contraseña"}
              </CustomText>
            </FullButton>
          </View>
        </View>
      </View>
    </Modal>
  );
}

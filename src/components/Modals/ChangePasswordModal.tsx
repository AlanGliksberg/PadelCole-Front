import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, Modal, TouchableOpacity, View } from "react-native";

import CustomText from "@/src/components/ui/CustomText/CustomText";
import CustomTextInput from "@/src/components/ui/CustomTextInput/CustomTextInput";
import FullButton from "@/src/components/ui/FullButton/FullButton";
import { ModalContext } from "@/src/contexts/ModalContext";
import { changePasswordSchema } from "@/src/schemas/changePasswordSchema";
import { changePassword } from "@/src/services/auth";
import { colors } from "@/src/theme";
import { styles } from "./ChangePasswordModal.styles";
import CustomModalView from "./CustomModalView";

type ChangePasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

interface ChangePasswordModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  isVisible,
  onClose,
}: ChangePasswordModalProps) {
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { openErrorModal, openModal } = useContext(ModalContext);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    setLoading(true);

    const response = await changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

    if (response.error) {
      openErrorModal(
        "Error",
        "No se pudo cambiar la contraseña. Verificá que tu contraseña actual sea correcta."
      );
      setLoading(false);
      return;
    }

    openModal({
      title: "Contraseña cambiada",
      message: "Tu contraseña ha sido cambiada correctamente",
      primaryAction: handleClose,
    });

    setLoading(false);
  };

  const handleClose = () => {
    reset();
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  const handleModalPress = () => {
    Keyboard.dismiss();
  };

  return (
    <CustomModalView
      visible={isVisible}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleClose}
      >
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPress={handleModalPress}
        >
          <View style={styles.header}>
            <CustomText style={styles.title}>Cambiar Contraseña</CustomText>
            <TouchableOpacity onPress={handleClose}>
              <MaterialIcons name="close" size={24} style={styles.closeIcon} />
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
                  secureTextEntry={!showCurrentPassword}
                  error={errors.currentPassword?.message}
                  placeholder="Ingresá tu contraseña actual"
                  autoCapitalize="none"
                  rightSlot={
                    <TouchableOpacity
                      onPress={() => setShowCurrentPassword((prev) => !prev)}
                    >
                      <AntDesign
                        name={showCurrentPassword ? "eye" : "eyeo"}
                        size={24}
                        color={colors.placeholder}
                      />
                    </TouchableOpacity>
                  }
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
                  secureTextEntry={!showNewPassword}
                  error={errors.newPassword?.message}
                  placeholder="Ingresá tu nueva contraseña"
                  autoCapitalize="none"
                  rightSlot={
                    <TouchableOpacity
                      onPress={() => setShowNewPassword((prev) => !prev)}
                    >
                      <AntDesign
                        name={showNewPassword ? "eye" : "eyeo"}
                        size={24}
                        color={colors.placeholder}
                      />
                    </TouchableOpacity>
                  }
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
                  secureTextEntry={!showConfirmPassword}
                  error={errors.confirmPassword?.message}
                  placeholder="Confirmá tu nueva contraseña"
                  autoCapitalize="none"
                  rightSlot={
                    <TouchableOpacity
                      onPress={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      <AntDesign
                        name={showConfirmPassword ? "eye" : "eyeo"}
                        size={24}
                        color={colors.placeholder}
                      />
                    </TouchableOpacity>
                  }
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
        </TouchableOpacity>
      </TouchableOpacity>
    </CustomModalView>
  );
}

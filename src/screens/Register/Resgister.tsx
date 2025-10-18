import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState } from "react";
import { Controller, Resolver, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { CustomText, CustomTextInput, FullButton } from "@/src/components";
import { LoadingContext } from "@/src/contexts/LoadingContext";
import { ModalContext } from "@/src/contexts/ModalContext";
import { registerSchema } from "@/src/schemas/registerSchema";
import { login, register } from "@/src/services/auth";
import { colors } from "@/src/theme";
import {
  AuthStackParamList,
  RegisterFormValues,
  RegisterPayload,
} from "@/src/types";
import { registerDefaultValues } from "@/src/types/forms/RegisterForm";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { styles } from "./Register.styles";
import { SetPlayerStackParamList } from "@/src/types/navigation/SetPlayerStack";
import { AuthContext } from "@/src/contexts/AuthContext";

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema) as Resolver<RegisterFormValues>,
    defaultValues: registerDefaultValues,
  });
  const { hideLoading, showLoading } = useContext(LoadingContext);
  const { openErrorModal, openModal } = useContext(ModalContext);
  const { saveToken } = useContext(AuthContext);
  const navigation =
    useNavigation<
      NavigationProp<AuthStackParamList & SetPlayerStackParamList>
    >();

  const onSubmit = async (values: RegisterFormValues) => {
    const data: RegisterPayload = {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      phone: values.phone,
    };
    showLoading();
    const res = await register(data);
    hideLoading();

    if (res.error)
      openErrorModal(
        "Registro",
        "Hubo un error inesperado en el registro. Intentá nuevamente en unos momentos."
      );
    else {
      openModal({
        title: "Registro",
        message: "Se ha registrado correctamente",
        primaryAction: () => handleRegister(data),
      });
    }
  };

  const handleRegister = async (data: RegisterPayload) => {
    const res = await login(data.email, data.password);
    if (res.error || !res.data) {
      navigation.navigate("Login");
      return;
    }
    saveToken(res.data?.token);
  };

  // TODO - agregar TYC
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.select({ ios: 100, android: 0 })}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={18} color={colors.primary} />
            <CustomText type="small" style={styles.buttonText}>
              Volver
            </CustomText>
          </TouchableOpacity>
          <CustomText.Title style={styles.title}>Registro</CustomText.Title>

          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="always"
          >
            {/* Campos del formulario */}
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, value } }) => (
                <CustomTextInput
                  label="Nombre"
                  value={value}
                  onChangeText={onChange}
                  error={errors.firstName?.message}
                  mandatory
                />
              )}
            />

            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, value } }) => (
                <CustomTextInput
                  label="Apellido"
                  value={value}
                  onChangeText={onChange}
                  error={errors.lastName?.message}
                  mandatory
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <CustomTextInput
                  label="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  error={errors.email?.message}
                  mandatory
                />
              )}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <CustomTextInput
                  label="Teléfono (opcional)"
                  keyboardType="phone-pad"
                  value={value}
                  onChangeText={onChange}
                  error={errors.phone?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <CustomTextInput
                  label="Contraseña"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  error={errors.password?.message}
                  mandatory
                  rightSlot={
                    <TouchableOpacity
                      onPress={() => setShowPassword((p) => !p)}
                    >
                      <AntDesign
                        name={showPassword ? "eye" : "eyeo"}
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
                  label="Confirmar contraseña"
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  error={errors.confirmPassword?.message}
                  mandatory
                  rightSlot={
                    <TouchableOpacity
                      onPress={() => setShowConfirmPassword((p) => !p)}
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

            <FullButton
              onPress={handleSubmit(onSubmit)}
              style={{ marginTop: 20 }}
            >
              <CustomText.ButtonText type="medium">
                Registrarse
              </CustomText.ButtonText>
            </FullButton>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;

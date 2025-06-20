import { LoadingContext } from "@/src/contexts/LoadingContext";
import { ModalContext } from "@/src/contexts/ModalContext";
import { googleLogin, login } from "@/src/services/auth";
import { colors } from "@/src/theme";
import { AntDesign } from "@expo/vector-icons";
import {
  GoogleSignin,
  isCancelledResponse,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import React, { useContext, useState } from "react";
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  CustomText,
  CustomTextInput,
  FullButton,
  SimpleButton,
} from "../../components";
import { AuthContext } from "../../contexts/AuthContext";
import { styles } from "./Login.styles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { saveToken } = useContext(AuthContext);
  const { hideLoading, showLoading, loading } = useContext(LoadingContext);
  const { openErrorModal } = useContext(ModalContext);

  const handleLogin = async () => {
    showLoading();
    const res = await login(email, password);
    if (res.error || !res.data) {
      hideLoading();
      if (res.code === 1)
        openErrorModal("Error", "Las credenciales ingresadas son incorrectas");
      else
        openErrorModal(
          "Error",
          "Ocurrió un error inesperado. Intente nuevamente."
        );
      return;
    }
    saveToken(res.data?.token);
    hideLoading();
  };

  const handleGoogle = async () => {
    showLoading();
    try {
      await GoogleSignin.hasPlayServices();
      const result = await GoogleSignin.signIn();

      let res = null;
      if (isSuccessResponse(result)) {
        res = await googleLogin(result.data.idToken!);
      } else if (isCancelledResponse(result)) return;

      if (!res || res.error || !res.data) {
        hideLoading();
        openErrorModal(
          "Error",
          "No se pudo iniciar sesión con Google. Intentá nuevamente."
        );
        return;
      }

      saveToken(res.data.token);
    } catch (e) {
      console.log("Error:", e);
      openErrorModal(
        "Error",
        "No se pudo iniciar sesión con Google. Intentá nuevamente."
      );
    } finally {
      hideLoading();
    }
  };
  const handleRegister = () => {
    // TODO
  };
  const handleForgot = () => {
    // TODO
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.card}>
          <CustomText.Title style={styles.title}>¡Bienvenido!</CustomText.Title>

          <View style={styles.inputsContainer}>
            <CustomTextInput
              placeholder="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <CustomTextInput
              placeholder="Contraseña"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              rightSlot={
                <TouchableOpacity
                  onPress={() => setShowPassword((prev) => !prev)}
                >
                  <AntDesign
                    name={showPassword ? "eye" : "eyeo"}
                    size={24}
                    color={colors.placeholder}
                  />
                </TouchableOpacity>
              }
            />
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.mainButtonsContainer}>
              <FullButton onPress={handleLogin} disabled={loading}>
                <CustomText.ButtonText uppercase>
                  Iniciar sesión
                </CustomText.ButtonText>
              </FullButton>

              <FullButton
                style={styles.googleButton}
                onPress={handleGoogle}
                disabled={loading}
              >
                <AntDesign name="google" size={20} color="#fff" />
                <CustomText.ButtonText uppercase>
                  Continuar con Google
                </CustomText.ButtonText>
              </FullButton>
            </View>

            <View style={styles.secondaryButtonsContainer}>
              <SimpleButton title="Registrarse" onPress={handleRegister} />
              <SimpleButton
                title="¿Olvidaste tu contraseña?"
                onPress={handleForgot}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

import { LoadingContext } from "@/src/contexts/LoadingContext";
import { login } from "@/src/services/auth";
import { colors } from "@/src/theme";
import { AntDesign } from "@expo/vector-icons";
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

  const handleLogin = async () => {
    showLoading();
    const res = await login(email, password);
    if (res.error || !res.data) {
      // TODO - manejar credenciales incorrectas o error
      hideLoading();
      return;
    }
    saveToken(res.data?.token);
    hideLoading();
  };
  const handleGoogle = () => {
    // TODO
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
          <CustomText.Title>¡Bienvenido!</CustomText.Title>

          <CustomTextInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View>
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

            <SimpleButton title="Registrarse" onPress={handleRegister} />
            <SimpleButton
              title="¿Olvidaste tu contraseña?"
              onPress={handleForgot}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

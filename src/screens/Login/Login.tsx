import { login } from "@/src/services/auth";
import { colors } from "@/src/theme";
import { LoginResponse } from "@/src/types/auth/LoginResponse";
import { AntDesign } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { TouchableOpacity, View } from "react-native";
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

  const handleLogin = async () => {
    const res = await login<LoginResponse>(email, password);
    if (res.error || !res.data) {
      return;
    }
    saveToken(res.data?.token);
  };
  const handleGoogle = () => {
    /* … */
  };
  const handleForgot = () => {
    /* … */
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <CustomText.Title>¡Bienvenido!</CustomText.Title>

        <CustomTextInput
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordView}>
          <CustomTextInput
            placeholder="Contraseña"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            style={styles.passwordEye}
          >
            <AntDesign
              name={showPassword ? "eye" : "eyeo"}
              size={24}
              color={colors.placeholder}
            />
          </TouchableOpacity>
        </View>

        <FullButton onPress={handleLogin}>
          <CustomText.ButtonText>Iniciar sesión</CustomText.ButtonText>
        </FullButton>

        <FullButton style={styles.googleButton} onPress={handleGoogle}>
          <AntDesign name="google" size={20} color="#fff" />
          <CustomText.ButtonText>Continuar con Google</CustomText.ButtonText>
        </FullButton>

        <SimpleButton
          title="¿Olvidaste tu contraseña?"
          onPress={handleForgot}
        />
      </View>
    </View>
  );
}

import { AntDesign } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { View } from "react-native";
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
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    // const jwt = await api.doLogin(email, password);
    // login(jwt);
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

        <CustomTextInput
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

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

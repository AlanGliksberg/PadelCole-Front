import { AntDesign } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { colors } from "../../theme";
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
        <Text style={styles.title}>¡Bienvenido!</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor={colors.placeholder}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor={colors.placeholder}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.googleButton]}
          onPress={handleGoogle}
        >
          <AntDesign name="google" size={20} color="#fff" />
          <Text style={[styles.buttonText, { marginLeft: 8 }]}>
            Continuar con Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgot}>
          <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

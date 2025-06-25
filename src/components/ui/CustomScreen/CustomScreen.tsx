import { colors } from "@/src/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./CustomScreen.styles";

interface CustomScreenProps {
  children: React.ReactNode;
  title: string;
  showBack?: boolean;
  loading?: boolean;
}

const CustomScreen: React.FC<CustomScreenProps> = ({
  children,
  title,
  showBack = false,
  loading = false,
}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right", "bottom"]}
    >
      <View style={styles.header}>
        {showBack ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
        ) : (
          <View style={styles.backPlaceholder} />
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.content}>
        {loading ? (
          <BlurView intensity={50} style={styles.loading}>
            <ActivityIndicator size="large" color={colors.primary} />
          </BlurView>
        ) : (
          children
        )}
      </View>
    </SafeAreaView>
  );
};

export default CustomScreen;

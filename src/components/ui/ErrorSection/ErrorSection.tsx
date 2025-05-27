import { colors } from "@/src/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import CustomText from "../CustomText/CustomText";
import SimpleButton from "../SimpleButton/SimpleButton";
import { styles } from "./ErrorSection.styles";

interface ErrorSectionProps {
  message: string;
  onRetry?: () => void;
}

const ErrorSection: React.FC<ErrorSectionProps> = ({ message, onRetry }) => (
  <View style={styles.container}>
    <MaterialIcons name="error-outline" size={64} color={colors.error} />
    <CustomText style={styles.message}>{message}</CustomText>
    {onRetry && (
      <SimpleButton
        containerStyle={styles.button}
        textStyle={styles.buttonText}
        title="Reintentar"
        onPress={onRetry}
      />
    )}
  </View>
);

export default ErrorSection;

import React from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { colors } from "../../../theme";
import { styles } from "./CustomTextInput.styles";
import { MaterialIcons } from "@expo/vector-icons";

const CustomTextInput: React.FC<TextInputProps> = (props) => {
  return (
    <View style={styles.searchSection}>
      <MaterialIcons name="close" size={28} color={colors.text} />
      <TextInput
        placeholderTextColor={colors.placeholder}
        {...props}
        style={[styles.input, props.style]}
      />
    </View>
  );
};

export default CustomTextInput;

import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { colors } from "../../../theme";
import { styles } from "./CustomTextInput.styles";

const CustomTextInput: React.FC<TextInputProps> = (props) => {
  return (
    <TextInput
      placeholderTextColor={colors.placeholder}
      {...props}
      style={[styles.input, props.style]}
    />
  );
};

export default CustomTextInput;

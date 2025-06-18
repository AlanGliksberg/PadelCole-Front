import React from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { colors } from "../../../theme";
import CustomText from "../CustomText/CustomText";
import { styles } from "./CustomTextInput.styles";

export interface CustomTextInputProps extends TextInputProps {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  label?: string;
  error?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  style,
  leftSlot,
  rightSlot,
  label,
  error,
  ...rest
}) => {
  return (
    <View>
      {label && (
        <CustomText type="medium" style={styles.label}>
          {label}
        </CustomText>
      )}

      <View style={[styles.searchSection, error && styles.errorInput]}>
        {leftSlot && <View style={styles.leftSlot}>{leftSlot}</View>}
        <TextInput
          placeholderTextColor={colors.placeholder}
          style={[styles.input, style]}
          {...rest}
        />
        {rightSlot && <View style={styles.rightSlot}>{rightSlot}</View>}
      </View>

      {error && <CustomText style={styles.errorText}>{error}</CustomText>}
    </View>
  );
};

export default CustomTextInput;

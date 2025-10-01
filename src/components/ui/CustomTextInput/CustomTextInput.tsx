import React from "react";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../../../theme";
import CustomText from "../CustomText/CustomText";
import { styles } from "./CustomTextInput.styles";

export interface CustomTextInputProps extends TextInputProps {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  label?: string;
  error?: string;
  mandatory?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  style,
  leftSlot,
  rightSlot,
  label,
  error,
  mandatory,
  containerStyle,
  disabled = false,
  ...rest
}) => {
  return (
    <View>
      {label && (
        <View style={styles.labelContainer}>
          <CustomText type="medium">{label}</CustomText>
          {mandatory && <CustomText type="xsmall">{" *"}</CustomText>}
        </View>
      )}

      <View
        style={[
          styles.searchSection,
          error && styles.errorInput,
          disabled && styles.disabled,
          containerStyle,
        ]}
      >
        {leftSlot && <View style={styles.leftSlot}>{leftSlot}</View>}
        <TextInput
          placeholderTextColor={colors.placeholder}
          style={[styles.input, style]}
          editable={!disabled}
          {...rest}
        />
        {rightSlot && <View style={styles.rightSlot}>{rightSlot}</View>}
      </View>

      {error && <CustomText style={styles.errorText}>{error}</CustomText>}
    </View>
  );
};

export default CustomTextInput;

import React from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { colors } from "../../../theme";
import { styles } from "./CustomTextInput.styles";

export interface CustomTextInputProps extends TextInputProps {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  style,
  leftSlot,
  rightSlot,
  ...rest
}) => {
  return (
    <View style={styles.searchSection}>
      <View style={styles.leftSide}>
        {leftSlot && <View style={styles.leftSlot}>{leftSlot}</View>}
        <TextInput
          placeholderTextColor={colors.placeholder}
          style={[styles.input, style]}
          {...rest}
        />
      </View>
      <View style={styles.rightSide}>
        {rightSlot && <View style={styles.rightSlot}>{rightSlot}</View>}
      </View>
    </View>
  );
};

export default CustomTextInput;

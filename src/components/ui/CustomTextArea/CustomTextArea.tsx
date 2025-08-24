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
import { styles } from "./CustomTextArea.styles";

export interface CustomTextAreaProps extends Omit<TextInputProps, "multiline"> {
  label?: string;
  error?: string;
  mandatory?: boolean;
  maxLength?: number;
  showCharacterCount?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  numberOfLines?: number;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  style,
  label,
  error,
  mandatory,
  maxLength,
  showCharacterCount = false,
  value = "",
  containerStyle,
  numberOfLines = 4,
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
        style={[styles.container, error && styles.errorInput, containerStyle]}
      >
        <TextInput
          multiline={true}
          numberOfLines={numberOfLines}
          placeholderTextColor={colors.placeholder}
          style={[styles.input, style]}
          maxLength={maxLength}
          value={value}
          {...rest}
        />
      </View>

      {(error || (showCharacterCount && maxLength)) && (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {error && <CustomText style={styles.errorText}>{error}</CustomText>}
          {showCharacterCount && maxLength && (
            <CustomText type="xsmall" style={styles.characterCount}>
              {`${value.length}/${maxLength}`}
            </CustomText>
          )}
        </View>
      )}
    </View>
  );
};

export default CustomTextArea;

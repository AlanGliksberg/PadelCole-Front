import React from "react";
import { ActivityIndicator, View } from "react-native";

import { CustomRadioButton } from "@/src/components";
import CustomText from "@/src/components/ui/CustomText/CustomText";
import { colors } from "@/src/theme";
import { styles } from "./CustomRadioInput.styles";

interface Option {
  id: number;
  label: string;
  [key: string]: any;
}

interface CustomRadioInputProps {
  label: string;
  labelProps?: {
    bold?: boolean;
    style?: any;
  };
  options: Option[];
  value: number | null;
  onSelect: (value: number) => void;
  disabled?: boolean;
  error?: string;
  loading?: boolean;
}

const CustomRadioInput: React.FC<CustomRadioInputProps> = ({
  label,
  labelProps = {},
  options,
  value,
  onSelect,
  disabled = false,
  error,
  loading = false,
}) => {
  return (
    <View>
      <CustomText
        style={[styles.label, labelProps.style]}
        bold={labelProps.bold}
      >
        {label}
      </CustomText>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <CustomRadioButton
              key={option.id}
              label={option.label}
              selected={value === option.id}
              onPress={() => !disabled && onSelect(option.id)}
              disabled={disabled}
            />
          ))}
        </View>
      )}

      {error && (
        <CustomText type="small" style={styles.errorText}>
          {error}
        </CustomText>
      )}
    </View>
  );
};

export default CustomRadioInput;

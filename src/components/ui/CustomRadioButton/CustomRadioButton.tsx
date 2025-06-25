import React from "react";
import { TouchableOpacity, View } from "react-native";
import CustomText from "../CustomText/CustomText";
import { styles } from "./CustomRadioButton.styles";

export type CustomRadioButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
};

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
  label,
  selected,
  onPress,
  disabled = false,
}) => (
  <TouchableOpacity
    style={[styles.container, disabled && styles.disabled]}
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.7}
  >
    <View style={[styles.outer, selected && styles.outerSelected]}>
      {selected && <View style={styles.inner} />}
    </View>
    <CustomText style={styles.label}>{label}</CustomText>
  </TouchableOpacity>
);

export default CustomRadioButton;

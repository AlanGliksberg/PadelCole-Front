import React from "react";
import {
  DimensionValue,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { styles } from "./FullButton.styles";

type ButtonSize = "xs" | "s" | "m" | "l" | "xl";

interface FullButtonProps extends TouchableOpacityProps {
  style?: ViewStyle;
  size?: ButtonSize;
}

const widthMap: Record<ButtonSize, DimensionValue> = {
  xs: "20%",
  s: "35%",
  m: "50%",
  l: "75%",
  xl: "100%",
};

const heightMap: Record<ButtonSize, DimensionValue> = {
  xs: 25,
  s: 30,
  m: 35,
  l: 40,
  xl: 45,
};

const FullButton: React.FC<FullButtonProps> = ({
  style,
  size = "xl",
  children,
  disabled,
  ...props
}) => {
  const sizeStyle = { width: widthMap[size], height: heightMap[size] };

  return (
    <TouchableOpacity
      {...props}
      style={[styles.button, sizeStyle, disabled && styles.disabled, style]}
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
  );
};

export default FullButton;

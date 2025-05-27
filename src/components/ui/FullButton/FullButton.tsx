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

const FullButton: React.FC<FullButtonProps> = ({
  style,
  size = "xl",
  children,
  ...props
}) => {
  const widthStyle = { width: widthMap[size] };

  return (
    <TouchableOpacity {...props} style={[styles.button, widthStyle, style]}>
      {children}
    </TouchableOpacity>
  );
};

export default FullButton;

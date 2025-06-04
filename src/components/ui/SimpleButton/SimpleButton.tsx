import { typography } from "@/src/theme";
import React from "react";
import {
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { styles } from "./SimpleButton.styles";

type ButtonSize = "xs" | "s" | "m" | "l" | "xl";

interface SimpleButtonProps extends TouchableOpacityProps {
  title: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  size?: ButtonSize;
}

const sizeMap: Record<ButtonSize, number> = {
  xs: typography.xsmall,
  s: typography.small,
  m: typography.medium,
  l: typography.body,
  xl: typography.h3,
};

const SimpleButton: React.FC<SimpleButtonProps> = ({
  title,
  containerStyle,
  textStyle,
  size = "m",
  ...props
}) => {
  const fontSize = sizeMap[size];
  return (
    <TouchableOpacity {...props} style={[styles.button, containerStyle]}>
      <Text style={[styles.text, { fontSize }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SimpleButton;

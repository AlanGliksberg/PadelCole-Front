import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { styles } from "./FullButton.styles";

interface FullButtonProps extends TouchableOpacityProps {
  style?: ViewStyle;
}

const FullButton: React.FC<FullButtonProps> = ({
  style,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity {...props} style={[styles.button, style]}>
      {children}
    </TouchableOpacity>
  );
};

export default FullButton;

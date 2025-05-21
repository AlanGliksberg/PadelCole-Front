import React from "react";
import {
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { styles } from "./SimpleButton.styles";

interface SimpleButtonProps extends TouchableOpacityProps {
  title: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({
  title,
  containerStyle,
  textStyle,
  ...props
}) => {
  return (
    <TouchableOpacity {...props} style={[styles.button, containerStyle]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SimpleButton;

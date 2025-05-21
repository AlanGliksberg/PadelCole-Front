import React from "react";
import { Text, TextProps, TextStyle } from "react-native";
import { styles } from "./CustomText.styles";

export interface CustomTextProps extends TextProps {
  style?: TextStyle;
}

export interface CustomTextComponent extends React.FC<CustomTextProps> {
  Title: React.FC<TextProps>;
  ButtonText: React.FC<TextProps>;
}

const CustomText: CustomTextComponent = ({ children, style, ...props }) => {
  return (
    <Text {...props} style={[styles.text, style]}>
      {children}
    </Text>
  );
};

// Subcomponente Title
const Title: React.FC<TextProps> = ({ children, style, ...props }) => {
  return (
    <Text {...props} style={[styles.title, style]}>
      {children}
    </Text>
  );
};

// Subcomponente ButtonText
const ButtonText: React.FC<TextProps> = ({ children, style, ...props }) => {
  return (
    <Text {...props} style={[styles.buttonText, style]}>
      {children}
    </Text>
  );
};

// Asignar subcomponentes
CustomText.Title = Title;
CustomText.ButtonText = ButtonText;

export default CustomText;

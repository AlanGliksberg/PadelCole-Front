import { typography } from "@/src/theme";
import React from "react";
import { Falsy, Text, TextProps, TextStyle } from "react-native";
import { styles } from "./CustomText.styles";

type TextType =
  | "xl"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "medium"
  | "body"
  | "small"
  | "xsmall";

export interface CustomTextProps extends TextProps {
  style?: TextStyle | (TextStyle | Falsy)[];
  bold?: boolean;
  type?: TextType;
  uppercase?: boolean;
}

export interface CustomTextComponent extends React.FC<CustomTextProps> {
  Title: React.FC<TextProps>;
  ButtonText: React.FC<CustomTextProps>;
}

const CustomText: CustomTextComponent = ({
  children,
  style,
  bold,
  type = "h4",
  ...props
}) => {
  return (
    <Text
      {...props}
      style={[
        styles.text,
        bold && styles.bold,
        { fontSize: typography[type] },
        style,
      ]}
    >
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
const ButtonText: React.FC<CustomTextProps> = ({
  children,
  style,
  bold,
  type = "small",
  uppercase = false,
  ...props
}) => {
  return (
    <Text
      {...props}
      style={[
        styles.buttonText,
        bold && styles.bold,
        { fontSize: typography[type] },
        uppercase && { textTransform: "uppercase" },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

// Asignar subcomponentes
CustomText.Title = Title;
CustomText.ButtonText = ButtonText;

export default CustomText;

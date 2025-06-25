import React from "react";
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import CustomText from "../CustomText/CustomText";
import { styles } from "./ToggleGroup.styles";

export type ToggleOption<T> = {
  label: string;
  value: T;
};

export type ToggleGroupProps<T> = {
  /** Texto encima del grupo (opcional) */
  label?: string;
  /** Lista de opciones */
  options: ToggleOption<T>[];
  /** Valor actualmente seleccionado */
  selected: T;
  /** Callback al elegir */
  onSelect: (value: T) => void;
  /** Deshabilita todo el grupo */
  disabled?: boolean;
  /** Estilos adicionales al contenedor */
  style?: ViewStyle;
  /** Estilos adicionales a cada botón */
  buttonStyle?: ViewStyle;
  /** Estilos adicionales al texto de cada botón */
  textStyle?: TextStyle;
};

const ToggleGroup = <T extends string | number | boolean | null>({
  label,
  options,
  selected,
  onSelect,
  disabled = false,
  style,
  buttonStyle,
  textStyle,
}: ToggleGroupProps<T>) => {
  return (
    <View style={style}>
      {label && (
        <CustomText type="body" style={styles.label}>
          {label}
        </CustomText>
      )}
      <View style={styles.row}>
        {options.map((opt) => {
          const isSelected = opt.value === selected;
          return (
            <TouchableOpacity
              key={String(opt.value)}
              style={[
                styles.button,
                isSelected && styles.buttonSelected,
                buttonStyle,
                disabled && styles.disabled,
              ]}
              onPress={() => !disabled && onSelect(opt.value)}
              activeOpacity={0.7}
            >
              <CustomText
                type="body"
                style={[
                  styles.text,
                  isSelected && styles.textSelected,
                  textStyle,
                ]}
              >
                {opt.label}
              </CustomText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ToggleGroup;

import React, { useState } from "react";
import {
  FlatList,
  Modal,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomText, { CustomTextProps } from "../CustomText/CustomText";
import { styles } from "./CustomSelect.styles";

type Item = {
  id: string | number;
};

export interface CustomSelectProps<T extends Item> {
  label: string;
  labelStyles?: TextStyle;
  labelProps?: CustomTextProps;
  placeholder?: string;
  data: T[];
  value: T["id"] | null;
  onSelect: (id: T["id"]) => void;
  keyExtractor: (item: T) => string;
  labelExtractor: (item: T) => string;
  disabled?: boolean;
  error?: string;
  mandatory?: boolean;
}

const CustomSelect = <T extends Item>({
  label,
  labelStyles,
  labelProps,
  placeholder = "Seleccioná...",
  data,
  value,
  onSelect,
  keyExtractor,
  labelExtractor,
  disabled,
  error,
  mandatory,
}: CustomSelectProps<T>) => {
  const [modalVisible, setModalVisible] = useState(false);
  const selectedItem = data.find((item) => item.id === value) || null;

  return (
    <View>
      <View style={styles.labelContainer}>
        <CustomText type="medium" style={labelStyles} {...labelProps}>
          {label}
        </CustomText>
        {mandatory && <CustomText type="xsmall">{" *"}</CustomText>}
      </View>

      <TouchableOpacity
        style={[styles.selectButton, disabled && styles.disabled]}
        onPress={() => !disabled && setModalVisible(true)}
      >
        <CustomText
          type="body"
          style={(!selectedItem && styles.placeholder) || undefined}
        >
          {selectedItem ? labelExtractor(selectedItem) : placeholder}
        </CustomText>
      </TouchableOpacity>
      {error ? <CustomText style={styles.errorText}>{error}</CustomText> : null}

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <FlatList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={({ item }) => {
              const isSelected = item.id === value;
              return (
                <TouchableOpacity
                  style={[styles.item, isSelected && styles.selected]}
                  onPress={() => {
                    onSelect(item.id);
                    setModalVisible(false);
                  }}
                >
                  <CustomText type="body">{labelExtractor(item)}</CustomText>
                </TouchableOpacity>
              );
            }}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </Modal>
    </View>
  );
};

export default CustomSelect;

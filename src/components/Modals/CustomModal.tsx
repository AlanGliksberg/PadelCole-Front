import { colors } from "@/src/theme";
import { ModalProps } from "@/src/types";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomText from "../ui/CustomText/CustomText";
import FullButton from "../ui/FullButton/FullButton";
import SimpleButton from "../ui/SimpleButton/SimpleButton";
import { styles } from "./CustomModal.styles";

const CustomModal: React.FC<ModalProps> = ({ params, isOpen, closeModal }) => {
  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      transparent
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.container}>
              <View style={styles.headerRow}>
                <CustomText style={styles.title}>{params?.title}</CustomText>
                <TouchableOpacity
                  onPress={closeModal}
                  style={styles.closeButton}
                >
                  <MaterialIcons name="close" size={28} color={colors.text} />
                </TouchableOpacity>
              </View>

              <CustomText style={styles.message}>{params?.message}</CustomText>

              <View style={styles.buttonsContainer}>
                <SimpleButton
                  title={params?.secondaryLabel || "Cancelar"}
                  onPress={() => {
                    params?.secondaryAction?.();
                    closeModal();
                  }}
                />
                <FullButton
                  onPress={() => {
                    params?.primaryAction?.();
                    closeModal();
                  }}
                  size="s"
                >
                  <CustomText.ButtonText type="small">
                    {params?.primaryLabel || "Aceptar"}
                  </CustomText.ButtonText>
                </FullButton>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal;

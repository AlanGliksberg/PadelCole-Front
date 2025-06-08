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
import SimpleButton from "../ui/SimpleButton/SimpleButton";
import { styles } from "./CustomErrorModal.styles";

const CustomErrorModal: React.FC<ModalProps> = ({
  params,
  isOpen,
  closeModal,
}) => {
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
                <View style={styles.titleContainer}>
                  <MaterialIcons
                    name="error-outline"
                    size={32}
                    color={colors.error}
                  />
                  <CustomText bold style={styles.title}>
                    {params?.title}
                  </CustomText>
                </View>
                <TouchableOpacity
                  onPress={closeModal}
                  style={styles.closeButton}
                >
                  <MaterialIcons name="close" size={28} color={colors.text} />
                </TouchableOpacity>
              </View>

              <CustomText style={styles.message}>{params?.message}</CustomText>

              <View style={styles.buttonsContainer}>
                <SimpleButton title={"Cerrar"} onPress={closeModal} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomErrorModal;

import { colors } from "@/src/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React, { PropsWithChildren } from "react";
import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomText from "../ui/CustomText/CustomText";
import { styles } from "./CustomModal.styles";
import CustomModalView from "./CustomModalView";

interface BaseModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
}

const BaseModal: React.FC<PropsWithChildren<BaseModalProps>> = ({
  isVisible,
  onClose,
  title,
  children,
}) => {
  return (
    <CustomModalView
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.container}>
              <View style={styles.headerRow}>
                <CustomText style={styles.title}>{title}</CustomText>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <MaterialIcons name="close" size={28} color={colors.text} />
                </TouchableOpacity>
              </View>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </CustomModalView>
  );
};

export default BaseModal;

import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";
import { styles } from "./AddPlayerToMatchModal.styles";
import { CustomText, CustomTextInput } from "..";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/src/theme";

interface PlayerDetailsModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const AddPlayerToMatchModal: React.FC<PlayerDetailsModalProps> = ({
  isOpen,
  closeModal,
}) => {
  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      transparent={true}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.headerRow}>
                <CustomText style={styles.title} bold type="h3">
                  Agregar jugador
                </CustomText>
                <TouchableOpacity
                  onPress={closeModal}
                  style={styles.closeButton}
                >
                  <MaterialIcons name="close" size={28} color={colors.text} />
                </TouchableOpacity>
              </View>
              <View>
                <CustomTextInput
                  placeholder="Buscá un jugador"
                  //         value={email}
                  //   onChangeText={setEmail}
                />
              </View>
              <View></View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddPlayerToMatchModal;

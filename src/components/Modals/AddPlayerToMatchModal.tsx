import { ModalContext } from "@/src/contexts/ModalContext";
import { addPlayerToMatch } from "@/src/services/match";
import { colors } from "@/src/theme";
import { Match, Player } from "@/src/types";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import {
  Keyboard,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import PlayersList from "../PlayersList/PlayersList";
import CustomText from "../ui/CustomText/CustomText";
import { styles } from "./AddPlayerToMatchModal.styles";

interface PlayerDetailsModalProps {
  isOpen: boolean;
  closeModal: () => void;
  match: Match | null;
  team: number | null;
  onPlayerAdd?: (p: Player) => void;
}

const AddPlayerToMatchModal: React.FC<PlayerDetailsModalProps> = ({
  isOpen,
  closeModal,
  match,
  team,
  onPlayerAdd,
}) => {
  const { openModal, openErrorModal } = useContext(ModalContext);

  const playerSelect = (player: Player) => {
    onClose();
    openModal({
      title: "Agregar jugador",
      message: `¿Estás seguro que querés agregar al jugador ${player.firstName} ${player.lastName} al partido?`,
      primaryLabel: "Agregar",
      primaryAction: async () => {
        const result = await addPlayerToMatch(match!.id, team!, player.id);
        // TODO - controlar error
        if (result.error) {
          openErrorModal(
            "Agregar jugador",
            "Error agregando el jugador al partido"
          );
          return;
        }
        onPlayerAdd?.(player);
      },
    });
  };

  const onClose = () => {
    closeModal();
  };

  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.headerRow}>
                <CustomText style={styles.title} bold type="h3">
                  Agregar jugador
                </CustomText>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <MaterialIcons name="close" size={28} color={colors.text} />
                </TouchableOpacity>
              </View>
              <PlayersList onPlayerSelect={playerSelect} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddPlayerToMatchModal;

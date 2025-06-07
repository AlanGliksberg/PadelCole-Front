import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";
import { styles } from "./AddPlayerToMatchModal.styles";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/src/theme";
import CustomText from "../ui/CustomText/CustomText";
import CustomSearchInput from "../ui/CustomSearchInput/CustomSearchInput";
import { useEffect, useState } from "react";
import { Player } from "@/src/types";
import { getPlayers } from "@/src/services/player";

interface PlayerDetailsModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const AddPlayerToMatchModal: React.FC<PlayerDetailsModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const [players, setPlayers] = useState<Player[]>([]);

  const searchPlayers = async (name: string) => {
    const resultPlayers = await getPlayers(name);
    setPlayers(resultPlayers.data);
  };

  useEffect(() => {
    console.log("players:", JSON.stringify(players));
  }, [players]);

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
              <View style={styles.searchContainer}>
                <CustomSearchInput
                  placeholder="Buscá un jugador"
                  startSearchingOn={3}
                  onSearch={searchPlayers}
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

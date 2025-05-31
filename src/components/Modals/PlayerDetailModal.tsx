import { colors } from "@/src/theme";
import { Player } from "@/src/types";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import PlayerAvatar from "../PlayerAvatar/PlayerAvatar";
import CustomText from "../ui/CustomText/CustomText";
import { styles } from "./PlayerDetailModal.styles";

interface PlayerDetailModalProps {
  player: Player | null;
  closePlayerDetail: () => void;
}

const PlayerDetailModal: React.FC<PlayerDetailModalProps> = ({
  player,
  closePlayerDetail,
}) => {
  return (
    <Modal
      visible={player !== null}
      animationType="fade"
      transparent={true}
      onRequestClose={closePlayerDetail}
    >
      <TouchableOpacity style={styles.backdrop} onPress={closePlayerDetail}>
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
          <View style={styles.header}>
            <View style={styles.nameContainer}>
              <PlayerAvatar player={player!} size="m" />
              <CustomText style={styles.name}>
                {`${player?.firstName} ${player?.lastName}`}
              </CustomText>
            </View>
            <View>
              <TouchableOpacity onPress={closePlayerDetail}>
                <MaterialIcons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default PlayerDetailModal;

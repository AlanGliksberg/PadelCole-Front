import { colors } from "@/src/theme";
import { Player } from "@/src/types";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import PlayerAvatar from "../PlayerAvatar/PlayerAvatar";
import CustomText from "../ui/CustomText/CustomText";
import { styles } from "./PlayerDetailsModal.styles";

interface PlayerDetailsModalProps {
  player: Player | null;
  closePlayerDetail: () => void;
}

// TODO - ver si se puede que, si lo esta viendo el creador de un partido,
// dar la opcion de eliminar el jugador del partido
const PlayerDetailsModal: React.FC<PlayerDetailsModalProps> = ({
  player,
  closePlayerDetail,
}) => {
  return (
    <Modal
      visible={player !== null}
      animationType="fade"
      transparent
      onRequestClose={closePlayerDetail}
    >
      <TouchableWithoutFeedback onPress={closePlayerDetail}>
        <View style={styles.backdrop}>
          <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
            <View style={styles.header}>
              <View style={styles.nameContainer}>
                <PlayerAvatar
                  player={player!}
                  size="m"
                  inverse
                  touchable={false}
                />
                <CustomText style={styles.name}>
                  {`${player?.firstName} ${player?.lastName}`}
                </CustomText>
              </View>
              <View>
                <TouchableOpacity onPress={closePlayerDetail}>
                  <MaterialIcons name="close" size={28} color={colors.white} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.rowItem}>
                <CustomText type="medium" bold>
                  Género:{" "}
                </CustomText>
                <CustomText type="small">
                  {player?.gender?.name || "No informado"}
                </CustomText>
              </View>
              <View style={styles.rowItem}>
                <CustomText type="medium" bold>
                  Posición:{" "}
                </CustomText>
                <CustomText type="small">
                  {player?.position?.description || "No informado"}
                </CustomText>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.rowItem}>
                <CustomText type="medium" bold>
                  Categoría:{" "}
                </CustomText>
                <CustomText type="small">
                  {player?.category?.description || "No informado"}
                </CustomText>
              </View>
              <View style={styles.rowItem}>
                <CustomText type="medium" bold>
                  Teléfono:{" "}
                </CustomText>
                <CustomText type="small">
                  {player?.phone || "No informado"}
                </CustomText>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PlayerDetailsModal;

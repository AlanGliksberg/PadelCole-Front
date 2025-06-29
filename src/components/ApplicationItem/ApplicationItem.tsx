import { colors } from "@/src/theme";
import { Application } from "@/src/types/application/Application";
import { MaterialIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Modal, TouchableOpacity, View } from "react-native";
import PlayerAvatar from "../PlayerAvatar/PlayerAvatar";
import CustomText from "../ui/CustomText/CustomText";
import { styles } from "./ApplicationItem.styles";

interface ApplicationItemProps {
  application: Application;
  onAccept: (application: Application, selectedTeam: 1 | 2) => void;
  onReject: (application: Application) => void;
  loading: boolean;
}

const ApplicationItem: React.FC<ApplicationItemProps> = ({
  application,
  onAccept,
  onReject,
  loading,
}) => {
  const [openTeamSelector, setOpenTeamSelector] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<1 | 2>(1);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const teamSelectRef = useRef<any>(null);

  useEffect(() => {
    setSelectedTeam(application.teamNumber || 1);
  }, [application.teamNumber]);

  const copyToClipboard = async (phone: string) => {
    try {
      await Clipboard.setStringAsync(phone);
      Alert.alert("Copiado", "El número de teléfono se copió al portapapeles");
    } catch (error) {
      Alert.alert("Error", "No se pudo copiar el número de teléfono");
    }
  };

  const handleTeamChange = (teamNumber: 1 | 2) => {
    setSelectedTeam(teamNumber);
    setOpenTeamSelector(false);
  };

  const toggleTeamSelector = () => {
    if (teamSelectRef.current) {
      teamSelectRef.current.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number
        ) => {
          setDropdownPosition({ x: pageX, y: pageY + height + 5 });
        }
      );
    }
    setOpenTeamSelector(!openTeamSelector);
  };

  return (
    <View style={styles.applicationCard}>
      <View style={styles.applicationHeader}>
        <View style={styles.playerInfo}>
          <PlayerAvatar player={application.player} size="m" touchable />
          <View style={styles.playerDetails}>
            <CustomText type="small" bold>
              {application.player?.firstName} {application.player?.lastName}
            </CustomText>
            <View style={styles.teamSelectContainer}>
              <TouchableOpacity
                ref={teamSelectRef}
                style={styles.teamSelect}
                onPress={toggleTeamSelector}
              >
                <CustomText type="xsmall" style={styles.teamSelectText}>
                  Equipo {selectedTeam}
                </CustomText>
                <MaterialIcons
                  name={
                    openTeamSelector
                      ? "keyboard-arrow-up"
                      : "keyboard-arrow-down"
                  }
                  size={16}
                  color={colors.description}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => onReject(application)}
            disabled={loading}
            style={styles.rejectButton}
          >
            <MaterialIcons name="close" size={20} color={colors.error} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onAccept(application, selectedTeam)}
            disabled={loading}
            style={styles.acceptButton}
          >
            <MaterialIcons name="check" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      {application.message && (
        <View style={styles.messageContainer}>
          <CustomText type="small" style={styles.message}>
            &ldquo;{application.message}&rdquo;
          </CustomText>
        </View>
      )}

      {application.phone && (
        <View style={styles.contactItem}>
          <MaterialIcons name="phone" size={16} color={colors.description} />
          <CustomText type="medium" style={styles.contactText}>
            {application.phone}
          </CustomText>
          <TouchableOpacity
            onPress={() =>
              application.phone && copyToClipboard(application.phone)
            }
            style={styles.copyButton}
          >
            <MaterialIcons
              name="content-copy"
              size={16}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      )}

      <Modal
        visible={openTeamSelector}
        transparent
        animationType="fade"
        onRequestClose={() => setOpenTeamSelector(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setOpenTeamSelector(false)}
        >
          <View
            style={[
              styles.teamDropdownModal,
              {
                position: "absolute",
                left: dropdownPosition.x,
                top: dropdownPosition.y,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.teamOption}
              onPress={() => handleTeamChange(1)}
            >
              <CustomText type="xsmall">Equipo 1</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.teamOption}
              onPress={() => handleTeamChange(2)}
            >
              <CustomText type="xsmall">Equipo 2</CustomText>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ApplicationItem;

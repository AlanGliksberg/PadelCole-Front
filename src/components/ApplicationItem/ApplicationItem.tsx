import { colors } from "@/src/theme";
import { Application } from "@/src/types/application/Application";
import { MaterialIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import PlayerAvatar from "../PlayerAvatar/PlayerAvatar";
import CustomText from "../ui/CustomText/CustomText";
import { styles } from "./ApplicationItem.styles";

interface ApplicationItemProps {
  application: Application;
  onAccept: (application: Application) => void;
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
  const [selectedTeam, setSelectedTeam] = useState(application.teamNumber);

  // Actualizar el equipo seleccionado cuando cambie la aplicación
  useEffect(() => {
    setSelectedTeam(application.teamNumber);
  }, [application.teamNumber]);

  const copyToClipboard = async (phone: string) => {
    await Clipboard.setStringAsync(phone);
  };

  const handleTeamChange = (teamNumber: number) => {
    setSelectedTeam(teamNumber);
    setOpenTeamSelector(false);
  };

  const toggleTeamSelector = () => {
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

              {openTeamSelector && (
                <View style={styles.teamDropdown}>
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
              )}
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
            onPress={() => onAccept(application)}
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
    </View>
  );
};

export default ApplicationItem;

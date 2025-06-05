import { AuthContext } from "@/src/contexts/AuthContext";
import { ModalContext } from "@/src/contexts/ModalContext";
import { deleteMatchApi } from "@/src/services/match";
import { colors, typography } from "@/src/theme";
import { Match } from "@/src/types";
import { parseDateToString } from "@/src/utils/common";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import TeamAvatars from "../TeamAvatars/TeamAvatars";
import BorderedButton from "../ui/BorderedButton/BorderedButton";
import CustomText from "../ui/CustomText/CustomText";
import { styles } from "./MatchBox.styles";

interface MatchBoxProps {
  match: Match;
  showCreatorDetails?: boolean;
  refreshData?: () => void;
}

const MatchBox: React.FC<MatchBoxProps> = ({
  match,
  showCreatorDetails = false,
  refreshData,
}) => {
  const { user } = useContext(AuthContext);
  const { openModal } = useContext(ModalContext);
  const isCreator = user?.playerId === match.creatorPlayerId;

  const deleteMatch = () => {
    openModal({
      title: "Eliminar partido",
      message: `¿Estás seguro que querés eliminar el partido ${match.location}?`,
      primaryLabel: "Sí, eliminar",
      primaryAction: async () => {
        await deleteMatchApi(match.id);
        refreshData && refreshData();
      },
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.column1}>
        <View style={styles.header}>
          <CustomText style={styles.location}>{match.location}</CustomText>
        </View>
        {match.description && (
          <CustomText style={styles.description}>
            {match.description}
          </CustomText>
        )}
        <View style={styles.dateContainer}>
          <MaterialCommunityIcons
            name="calendar"
            size={18}
            color={colors.description}
          />
          <CustomText style={styles.meta}>
            {parseDateToString(match.date)}
          </CustomText>
          <CustomText style={styles.meta}>-</CustomText>
          <MaterialIcons
            name="access-time"
            size={18}
            color={colors.description}
          />
          <CustomText style={styles.meta}>{match.time}</CustomText>
        </View>
        <View style={styles.row}>
          <CustomText style={styles.tag}>{match.gender.pluralName}</CustomText>
          <CustomText style={styles.tag}>
            {match.category.description}
          </CustomText>
          <CustomText style={styles.tag}>{match.duration} min</CustomText>
        </View>
        <View style={styles.row}>
          <CustomText type="small" bold>
            Jugadores:
          </CustomText>
        </View>
        <View style={styles.row}>
          <TeamAvatars
            players={match.teams.find((t) => t.teamNumber === 1)!.players}
            isCreator
          />
          <CustomText style={styles.vs}>vs</CustomText>
          <TeamAvatars
            players={match.teams.find((t) => t.teamNumber === 2)!.players}
            isCreator
          />
        </View>
      </View>
      <View style={styles.column2}>
        <View>
          <CustomText.ButtonText
            style={[styles.status, styles[match.status.name]]}
          >
            {match.status.description}
          </CustomText.ButtonText>
          {isCreator && showCreatorDetails && (
            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() => {
                  // onEdit && onEdit(match)
                }}
                style={styles.iconButton}
              >
                <MaterialIcons
                  name="edit"
                  size={typography.h4}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteMatch} style={styles.iconButton}>
                <MaterialIcons
                  name="delete"
                  size={typography.h4}
                  color={colors.error}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        {isCreator && showCreatorDetails && (
          <BorderedButton size="xl">
            <CustomText type="xsmall" style={styles.applicationsButtonText}>
              Postulaciones
            </CustomText>
            <View style={styles.badge}>
              <CustomText style={styles.badgeText}>
                {match.applications.length}
              </CustomText>
            </View>
          </BorderedButton>
        )}
      </View>
    </View>
  );
};

export default MatchBox;

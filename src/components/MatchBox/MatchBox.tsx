import { AuthContext } from "@/src/contexts/AuthContext";
import { ModalContext } from "@/src/contexts/ModalContext";
import { PlayerModalsContext } from "@/src/contexts/PlayerModalsContext";
import { deleteMatchApi } from "@/src/services/match";
import { colors } from "@/src/theme";
import { Match } from "@/src/types";
import { MeFaltaAlguienStackParamList } from "@/src/types/navigation/MeFaltaAlguienStack";
import { parseDateToString } from "@/src/utils/common";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext } from "react";
import { View } from "react-native";
import TeamAvatars from "../TeamAvatars/TeamAvatars";
import BorderedButton from "../ui/BorderedButton/BorderedButton";
import CustomText from "../ui/CustomText/CustomText";
import DropdownMenu from "../ui/DropdownMenu/DropdownMenu";
import { styles } from "./MatchBox.styles";

type NavigationProp = NativeStackNavigationProp<MeFaltaAlguienStackParamList>;

interface MatchBoxProps {
  match: Match;
  showCreatorDetails?: boolean;
  refreshData?: () => Promise<void>;
}

const MatchBox: React.FC<MatchBoxProps> = ({
  match,
  showCreatorDetails = false,
  refreshData,
}) => {
  const { user } = useContext(AuthContext);
  const { openModal } = useContext(ModalContext);
  const { openApplicationsModal } = useContext(PlayerModalsContext);
  const navigation = useNavigation<NavigationProp>();
  const isCreator = user?.playerId === match.creatorPlayerId;

  const deleteMatch = () => {
    openModal({
      title: "Eliminar partido",
      message: `¿Estás seguro que querés eliminar el partido ${match.location}?`,
      primaryLabel: "Sí, eliminar",
      primaryAction: async () => {
        await deleteMatchApi(match.id);
        refreshData && (await refreshData());
      },
    });
  };

  const handleEdit = () => {
    navigation.navigate("EditarPartido", { match });
  };

  const handleApplications = () => {
    openApplicationsModal(match, refreshData);
  };

  const dropdownOptions = [
    {
      label: "Editar",
      onPress: handleEdit,
      icon: "edit",
    },
    {
      label: "Eliminar",
      onPress: deleteMatch,
      icon: "delete",
      destructive: true,
    },
  ];

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
            color={colors.tagText}
          />
          <CustomText style={styles.meta}>
            {parseDateToString(match.date)}
          </CustomText>
          <CustomText style={styles.meta}>-</CustomText>
          <MaterialIcons name="access-time" size={18} color={colors.tagText} />
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
            match={match}
            team={1}
            callback={refreshData}
            canDelete={showCreatorDetails}
          />
          <CustomText style={styles.vs}>vs</CustomText>
          <TeamAvatars
            players={match.teams.find((t) => t.teamNumber === 2)!.players}
            isCreator
            match={match}
            team={2}
            callback={refreshData}
            canDelete={showCreatorDetails}
          />
        </View>
      </View>
      <View style={styles.column2}>
        <View style={styles.statusContainer}>
          <CustomText.ButtonText
            style={[styles.status, styles[match.status.name]]}
          >
            {match.status.description}
          </CustomText.ButtonText>
          {isCreator && showCreatorDetails && (
            <DropdownMenu options={dropdownOptions} />
          )}
        </View>
        {isCreator && showCreatorDetails && (
          <BorderedButton size="xl" onPress={handleApplications}>
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

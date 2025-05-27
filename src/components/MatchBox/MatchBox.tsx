import { Match } from "@/src/types";
import { parseDateToString } from "@/src/utils/common";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import CustomText from "../ui/CustomText/CustomText";

import { colors } from "@/src/theme";
import { styles } from "./MatchBox.styles";

interface MatchBoxProps {
  match: Match;
}

const MatchBox: React.FC<MatchBoxProps> = ({ match }) => {
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "70%", gap: 2 }}>
          <CustomText style={styles.location}>{`${match.location}`}</CustomText>
          {match.description && (
            <CustomText style={styles.description}>
              {match.description}
            </CustomText>
          )}
          <View style={{ flexDirection: "row", gap: 3 }}>
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
            <CustomText style={styles.tag}>{match.category}</CustomText>
            <CustomText style={styles.tag}>{match.duration} min</CustomText>
            <CustomText style={styles.tag}>
              {match.gender.pluralName}
            </CustomText>
          </View>
        </View>
        <View style={{ alignItems: "flex-end", width: "30%" }}>
          <CustomText.ButtonText
            style={[styles.status, styles[match.status.name]]}
          >
            {match.status.description}
          </CustomText.ButtonText>
        </View>
      </View>
    </View>
  );
};

export default MatchBox;

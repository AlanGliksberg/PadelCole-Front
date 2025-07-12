import React from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CustomText from "../ui/CustomText/CustomText";
import { styles } from "./StatusChip.styles";
import { colors } from "@/src/theme";
import { MATCH_STATUS } from "@/src/constants/match";
import { APPLICATION_STATUS } from "@/src/constants/application";

interface StatusChipProps {
  code: MATCH_STATUS | APPLICATION_STATUS;
  label: string;
  description?: string;
  type: "match" | "application";
}

function isApplication(
  type: string,
  code: MATCH_STATUS | APPLICATION_STATUS
): code is APPLICATION_STATUS {
  return type === "application";
}
function isMatch(
  type: string,
  code: MATCH_STATUS | APPLICATION_STATUS
): code is MATCH_STATUS {
  return type === "match";
}

const StatusChip: React.FC<StatusChipProps> = ({
  code,
  label,
  description,
  type,
}) => {
  let codeStyle;
  if (isApplication(type, code)) {
    codeStyle = styles[`application_${code}`];
  } else {
    codeStyle = styles[`match_${code}`];
  }

  const chipContent = (
    <View style={[styles.chipContainer, codeStyle]}>
      <CustomText style={styles.status} bold>
        {label}
      </CustomText>
      {description && (
        <MaterialIcons name="info-outline" size={15} color={colors.text} />
      )}
    </View>
  );

  if (description) {
    return chipContent;
  }

  return chipContent;
};

export default StatusChip;

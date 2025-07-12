import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
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
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const chipRef = useRef<View>(null);
  const timeoutRef = useRef<number | null>(null);
  const { width: screenWidth } = Dimensions.get("window");

  let codeStyle;
  if (isApplication(type, code)) {
    codeStyle = styles[`application_${code}`];
  } else {
    codeStyle = styles[`match_${code}`];
  }

  const handlePress = () => {
    chipRef.current?.measure((x, y, width, height, pageX, pageY) => {
      // Estimar el ancho real del texto (aproximadamente 10px por carácter)
      const estimatedTextWidth = (description?.length || 0) * 10 + 40; // 40px de padding
      const tooltipWidth = Math.min(estimatedTextWidth, 250); // Máximo 250px

      let adjustedX = pageX;

      if (pageX + tooltipWidth > screenWidth) {
        adjustedX = screenWidth - tooltipWidth - 10;
      }

      setTooltipPosition({ x: adjustedX, y: pageY + height - 40 });
      setShowTooltip(true);

      timeoutRef.current = setTimeout(() => {
        setShowTooltip(false);
      }, 2500);
    });
  };

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

  const handleCloseTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowTooltip(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!description) return chipContent;

  return (
    <>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View ref={chipRef}>{chipContent}</View>
      </TouchableWithoutFeedback>

      <Modal
        visible={showTooltip}
        transparent
        animationType="fade"
        onRequestClose={handleCloseTooltip}
      >
        <TouchableWithoutFeedback onPress={handleCloseTooltip}>
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.tooltipBubble,
                {
                  left: tooltipPosition.x,
                  top: tooltipPosition.y,
                  borderColor: codeStyle.backgroundColor,
                },
              ]}
            >
              <CustomText
                style={[
                  styles.tooltipText,
                  { color: codeStyle.backgroundColor },
                ]}
              >
                {description}
              </CustomText>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default StatusChip;

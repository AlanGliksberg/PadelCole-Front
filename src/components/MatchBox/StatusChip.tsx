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
  code: MATCH_STATUS | APPLICATION_STATUS | number;
  label: string;
  description?: string;
  type: "match" | "application" | "result";
}

function isApplication(
  type: string,
  code: MATCH_STATUS | APPLICATION_STATUS | number
): code is APPLICATION_STATUS {
  return type === "application";
}
function isMatch(
  type: string,
  code: MATCH_STATUS | APPLICATION_STATUS | number
): code is MATCH_STATUS {
  return type === "match";
}

function isResult(
  type: string,
  code: MATCH_STATUS | APPLICATION_STATUS | number
): code is number {
  return type === "result";
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
  } else if (isMatch(type, code)) {
    codeStyle = styles[`match_${code}`];
  } else if (isResult(type, code)) {
    const styleLabel = !code ? "tie" : code > 0 ? "win" : "lose";
    codeStyle = styles[`result_${styleLabel}`];
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
      }, 3000);
    });
  };

  const chipContent = (
    <View style={[styles.chipContainer, codeStyle]}>
      <CustomText style={styles.status} bold>
        {label}
      </CustomText>
      {description && (
        <MaterialIcons name="info-outline" size={16} color={colors.text} />
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
                  borderColor: codeStyle?.backgroundColor,
                },
              ]}
            >
              <CustomText
                style={[
                  styles.tooltipText,
                  { color: colors.text },
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

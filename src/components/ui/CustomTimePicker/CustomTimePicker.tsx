import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import CustomText from "../CustomText/CustomText";
import { styles } from "./CustomTimePicker.styles";

interface CustomTimePickerProps {
  label?: string;
  time: Date | null;
  onChange: (d: Date | null) => void;
  mandatory?: boolean;
  placeholder: string;
  error?: string;
  inputStyles?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
  neutralButtonLabel?: string;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  label,
  time,
  onChange,
  mandatory,
  placeholder,
  error,
  inputStyles,
  neutralButtonLabel,
}) => {
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onTimeChange = (event: DateTimePickerEvent, time?: Date) => {
    setShowTimePicker(false);
    if (event.type === "neutralButtonPressed") {
      onChange(null);
      return;
    } else if (event.type === "dismissed") {
      return;
    }
    if (time) onChange(time);
  };

  const d = new Date();
  d.setHours(19, 0, 0, 0);
  const selectedTime = time || d;

  return (
    <View>
      {label && (
        <View style={styles.labelContainer}>
          <CustomText type="medium" style={styles.label}>
            Hora
          </CustomText>
          {mandatory && (
            <CustomText type="xsmall" style={styles.label}>
              {" *"}
            </CustomText>
          )}
        </View>
      )}

      <TouchableOpacity
        style={[styles.pickerButton, inputStyles]}
        onPress={() => setShowTimePicker(true)}
      >
        {time ? (
          <CustomText>
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </CustomText>
        ) : (
          <CustomText style={styles.placeholder}>
            {placeholder || "Seleccioná la hora"}
          </CustomText>
        )}
      </TouchableOpacity>
      {error && <CustomText style={styles.errorText}>{error}</CustomText>}

      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="default"
          onChange={onTimeChange}
          is24Hour
          neutralButton={{ label: neutralButtonLabel }}
        />
      )}
    </View>
  );
};

export default CustomTimePicker;

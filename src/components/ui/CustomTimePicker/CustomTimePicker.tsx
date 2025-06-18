import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import CustomText from "../CustomText/CustomText";
import { styles } from "./CustomTimePicker.styles";

interface CustomTimePickerProps {
  time: Date | null;
  onChange: (d: Date) => void;
  mandatory?: boolean;
  placeholder: string;
  error?: string;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  time,
  onChange,
  mandatory,
  placeholder,
  error,
}) => {
  const [showTimePicker, setShowTimePicker] = useState(false);

  const action = (_: any, time?: Date) => {
    setShowTimePicker(false);
    if (time) onChange(time);
  };

  const d = new Date();
  d.setHours(19, 0, 0, 0);
  const selectedTime = time || d;

  return (
    <View>
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

      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setShowTimePicker(true)}
      >
        {time ? (
          <CustomText>
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
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
          onChange={action}
          is24Hour
        />
      )}
    </View>
  );
};

export default CustomTimePicker;

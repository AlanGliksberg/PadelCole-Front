import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import CustomText from "../CustomText/CustomText";
import { styles } from "./CustomDatePicker.styles";

interface CustomDatePickerProps {
  label?: string;
  date: Date | null;
  minimumDate?: Date;
  onChange: (d: Date | null) => void;
  mandatory?: boolean;
  placeholder?: string;
  error?: string;
  inputStyles?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
  neutralButtonLabel?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  date,
  minimumDate,
  onChange,
  mandatory,
  placeholder,
  error,
  inputStyles,
  neutralButtonLabel,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowDatePicker(false);
    if (event.type === "neutralButtonPressed") {
      onChange(null);
      return;
    } else if (event.type === "dismissed") {
      return;
    }
    if (date) onChange(date);
  };

  return (
    <View>
      {label && (
        <View style={styles.labelContainer}>
          <CustomText type="medium" style={styles.label}>
            {label}
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
        onPress={() => setShowDatePicker(true)}
      >
        {date ? (
          <CustomText>{date.toLocaleDateString()}</CustomText>
        ) : (
          <CustomText style={styles.placeholder}>
            {placeholder || "Seleccioná la fecha"}
          </CustomText>
        )}
      </TouchableOpacity>
      {error && <CustomText style={styles.errorText}>{error}</CustomText>}

      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={minimumDate}
          neutralButton={{ label: neutralButtonLabel }}
        />
      )}
    </View>
  );
};

export default CustomDatePicker;

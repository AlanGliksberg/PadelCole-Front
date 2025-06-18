import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import CustomText from "../CustomText/CustomText";
import { styles } from "./CustomDatePicker.styles";

interface CustomDatePickerProps {
  date: Date | null;
  minimumDate?: Date;
  onChange: (d: Date) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  date,
  minimumDate,
  onChange,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const action = (_: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) onChange(date);
  };

  return (
    <View>
      <CustomText type="medium" style={styles.label}>
        Fecha
      </CustomText>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setShowDatePicker(true)}
      >
        {date ? (
          <CustomText>{date.toLocaleDateString()}</CustomText>
        ) : (
          <CustomText style={styles.placeholder}>
            Seleccioná la fecha
          </CustomText>
        )}
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={action}
          minimumDate={minimumDate}
        />
      )}
    </View>
  );
};

export default CustomDatePicker;

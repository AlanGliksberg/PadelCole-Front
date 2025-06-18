import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import CustomText from "../CustomText/CustomText";
import { styles } from "./CustomTimePicker.styles";

interface CustomTimePickerProps {
  time: Date | null;
  onChange: (d: Date) => void;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  time,
  onChange,
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
      <CustomText type="medium" style={styles.label}>
        Hora
      </CustomText>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setShowTimePicker(true)}
      >
        {time ? (
          <CustomText>{time.toLocaleTimeString().slice(0, 5)}</CustomText>
        ) : (
          <CustomText style={styles.placeholder}>Seleccioná la hora</CustomText>
        )}
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="default"
          onChange={action}
        />
      )}
    </View>
  );
};

export default CustomTimePicker;

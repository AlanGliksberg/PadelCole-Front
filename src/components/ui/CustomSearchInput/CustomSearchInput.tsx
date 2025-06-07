import { useEffect, useRef, useState } from "react";
import CustomTextInput, {
  CustomTextInputProps,
} from "../CustomTextInput/CustomTextInput";
import { useDebounce } from "@/src/types/hooks/useDebounce";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/src/theme";

interface CustomSearchInputProps extends CustomTextInputProps {
  onSearch: (s: string) => void;
  startSearchingOn?: number;
}

const CustomSearchInput: React.FC<CustomSearchInputProps> = ({
  onSearch,
  startSearchingOn = 0,
  ...rest
}) => {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value);

  useEffect(() => {
    if (
      debouncedValue.length >= startSearchingOn ||
      debouncedValue.length === 0
    )
      onSearch(debouncedValue);
  }, [debouncedValue, onSearch, startSearchingOn]);

  const cleanInput = () => {
    setValue("");
  };

  return (
    <CustomTextInput
      value={value}
      onChangeText={setValue}
      {...rest}
      rightSlot={
        value ? (
          <TouchableOpacity onPress={cleanInput}>
            <MaterialIcons name="close" size={28} color={colors.placeholder} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={cleanInput}>
            <MaterialIcons name="search" size={28} color={colors.placeholder} />
          </TouchableOpacity>
        )
      }
    />
  );
};
export default CustomSearchInput;

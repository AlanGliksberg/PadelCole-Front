import { useDebounce } from "@/src/hooks/useDebounce";
import { colors } from "@/src/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import CustomTextInput, {
  CustomTextInputProps,
} from "../CustomTextInput/CustomTextInput";

interface CustomSearchInputProps extends CustomTextInputProps {
  onSearch: (s: string) => void;
  startSearchingOn?: number;
  onClear?: () => void;
}

const CustomSearchInput: React.FC<CustomSearchInputProps> = ({
  onSearch,
  startSearchingOn = 0,
  onClear,
  ...rest
}) => {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value);

  useEffect(() => {
    if (debouncedValue.length >= startSearchingOn) onSearch(debouncedValue);
  }, [debouncedValue, onSearch, startSearchingOn]);

  const cleanInput = () => {
    onClear && onClear();
    setValue("");
  };

  return (
    <CustomTextInput
      value={value}
      onChangeText={setValue}
      {...rest}
      leftSlot={
        <TouchableOpacity onPress={cleanInput}>
          <MaterialIcons name="search" size={28} color={colors.placeholder} />
        </TouchableOpacity>
      }
      rightSlot={
        value ? (
          <TouchableOpacity onPress={cleanInput}>
            <MaterialIcons name="close" size={28} color={colors.placeholder} />
          </TouchableOpacity>
        ) : (
          <></>
        )
      }
    />
  );
};
export default CustomSearchInput;

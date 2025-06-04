import { StyleSheet } from "react-native";
import { colors } from "../../../theme";

export const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
});

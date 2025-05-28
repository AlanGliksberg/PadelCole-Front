import { StyleSheet } from "react-native";
import { colors, spacing } from "../../../theme";

export const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    height: 36,
    borderRadius: 8,
    marginBottom: spacing.sm,
    borderColor: colors.primary,
    borderWidth: 2,
  },
});

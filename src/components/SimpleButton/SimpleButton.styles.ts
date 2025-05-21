import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";

export const styles = StyleSheet.create({
  button: {
    marginTop: spacing.sm,
    alignSelf: "center",
  },
  text: {
    color: colors.primary,
    fontSize: typography.small,
    textAlign: "center",
  },
});

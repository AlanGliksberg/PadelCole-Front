import { colors, spacing, typography } from "@/src/theme";
import { StyleSheet } from "react-native";

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

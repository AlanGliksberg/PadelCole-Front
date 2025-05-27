import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../../theme";

export const styles = StyleSheet.create({
  text: {
    color: colors.text,
    fontSize: typography.body,
  },
  bold: {
    fontWeight: "600",
  },
  title: {
    fontSize: typography.h2,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  buttonText: {
    color: colors.surface,
    fontSize: typography.small,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});

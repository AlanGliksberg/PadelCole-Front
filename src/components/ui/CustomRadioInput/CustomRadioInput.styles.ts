import { colors, spacing } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  optionsContainer: {
    gap: spacing.sm,
  },
  label: {
    marginBottom: spacing.sm,
    color: colors.text,
  },
  loadingContainer: {
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  errorText: {
    color: colors.error,
    marginTop: spacing.xs,
  },
});

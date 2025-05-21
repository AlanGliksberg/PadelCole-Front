import { Platform, StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";

export const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#F2F2F7",
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    fontSize: typography.body,
    color: colors.text,
    ...Platform.select({ android: { paddingVertical: 0 } }),
  },
});

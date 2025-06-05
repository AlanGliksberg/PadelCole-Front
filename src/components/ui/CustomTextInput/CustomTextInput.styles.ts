import { Platform, StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../../theme";

export const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.input,
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: colors.input,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    fontSize: typography.body,
    color: colors.text,
    ...Platform.select({ android: { paddingVertical: 0 } }),
  },
});

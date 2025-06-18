import { colors, spacing, typography } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  label: {
    marginBottom: spacing.xs,
  },
  selectButton: {
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 48,
    backgroundColor: colors.input,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
  },
  disabled: {
    opacity: 0.5,
  },
  placeholder: {
    color: colors.placeholder,
  },
  errorText: {
    marginTop: spacing.sm,
    color: colors.error,
    fontSize: typography.body,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: colors.background,
    maxHeight: "50%",
    padding: spacing.md,
    borderTopLeftRadius: spacing.lg,
    borderTopRightRadius: spacing.lg,
  },
  item: {
    padding: spacing.sm,
  },
  selected: {
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
});

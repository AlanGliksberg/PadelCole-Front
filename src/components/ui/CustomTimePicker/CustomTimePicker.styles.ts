import { colors, spacing, typography } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  pickerButton: {
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 42,
    backgroundColor: colors.input,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
  },
  labelContainer: {
    flexDirection: "row",
  },
  label: {
    marginBottom: spacing.xs,
  },
  placeholder: {
    color: colors.placeholder,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.caption,
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  buttonsSection: {
    gap: spacing.sm,
  },
});

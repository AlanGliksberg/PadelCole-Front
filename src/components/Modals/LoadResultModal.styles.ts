import { colors, spacing, typography } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  scrollContainer: {
    padding: spacing.sm,
  },
  section: {
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  sectionTitle: {
    color: colors.primary,
  },
  disabledInput: {
    backgroundColor: colors.disabled,
    opacity: 0.6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  halfWidth: {
    width: 140,
  },
  teamsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: spacing.xxl,
  },
  teamColumn: {
    flex: 1,
    alignItems: "center",
  },
  teamLabel: {
    marginBottom: spacing.sm,
  },
  resultsContainer: {},
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 65,
  },
  setLabel: {
    minWidth: 65,
    textAlignVertical: "center",
  },
  scoreInputsRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  scoreInputContainer: {
    width: 50,
    borderWidth: 1,
    borderColor: colors.placeholder,
  },
  scoreInputContainerWinner: {
    borderWidth: 4,
    borderColor: colors.setWin,
  },
  scoreInput: {
    textAlign: "center",
  },
  vsText: {
    color: colors.text,
    fontSize: typography.body,
  },
  disabledButton: {
    // backgroundColor: colors.disabled,
    opacity: 0.6,
  },
  saveButtonText: {
    color: colors.background,
    fontSize: typography.body,
    fontWeight: "600",
  },
  rejectButton: {
    marginTop: spacing.md,
  },
});

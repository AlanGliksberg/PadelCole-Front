import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";

export const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    gap: spacing.xs,
  },
  match_PENDING: { backgroundColor: colors.pendingMatchStatus },
  match_CLOSED: { backgroundColor: colors.closedMatchStatus },
  match_COMPLETED: { backgroundColor: colors.completedMatchStatus },
  match_CANCELLED: { backgroundColor: colors.cancelleddMatchStatus },
  application_PENDING: { backgroundColor: colors.pendingApplicationStatus },
  application_ACCEPTED: { backgroundColor: colors.acceptedApplicationStatus },
  application_REJECTED: { backgroundColor: colors.rejectedApplicationStatus },
  status: {
    textTransform: "capitalize",
    fontSize: typography.small,
    color: colors.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  tooltipContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -125 }, { translateY: -50 }], // Centrar el tooltip
    alignItems: "center",
    zIndex: 1000,
  },
  tooltipBubble: {
    position: "absolute",
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.sm,
    maxWidth: 250,
    borderWidth: 1,
    borderColor: colors.border,
    zIndex: 1000,
  },

  tooltipText: {
    fontSize: typography.small,
    color: colors.text,
    lineHeight: 12,
  },
});

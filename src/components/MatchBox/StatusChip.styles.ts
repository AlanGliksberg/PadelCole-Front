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
});

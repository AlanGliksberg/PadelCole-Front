import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    display: "flex",
  },
  status: {
    backgroundColor: colors.accent,
    color: colors.text,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    textTransform: "capitalize",
    marginBottom: spacing.sm,
    fontSize: typography.small,
  },
  PENDING: {
    backgroundColor: colors.pendingStatus,
  },
  CLOSED: {
    backgroundColor: colors.closedStatus,
  },
  COMPLETED: {
    backgroundColor: colors.completedStatus,
  },
  location: {
    fontSize: typography.h3,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.small,
    color: colors.description,
    marginBottom: spacing.sm,
  },
  meta: {
    fontSize: typography.small,
    color: colors.description,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: "row",
    marginBottom: spacing.sm,
  },
  tag: {
    backgroundColor: "#E0E0E0",
    color: colors.tag,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    marginRight: spacing.sm,
    fontSize: typography.small,
  },
});

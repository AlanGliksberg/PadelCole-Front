import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
  matchesContainer: {
    height: "87%",
  },
  separator: {
    width: "100%",
    height: 2,
    backgroundColor: colors.selectedText,
  },
  createMatchContainer: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  createMatchButton: {
    alignSelf: "center",
  },
  matchesText: {
    marginBottom: spacing.md,
  },
  emptyContainer: {
    alignItems: "center",
    padding: spacing.lg,
    marginTop: 90,
    display: "flex",
    gap: 10,
  },
  emptyTitle: {
    fontSize: typography.h2,
    fontWeight: "600",
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  emptySubtitle: {
    fontSize: typography.body,
    color: colors.description,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  emptyDescription: {
    fontSize: typography.body,
    color: colors.description,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  emptyPrimaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  emptySecondaryLink: {
    color: colors.primary,
  },
  matchesScroll: {
    overflow: "hidden",
  },
});

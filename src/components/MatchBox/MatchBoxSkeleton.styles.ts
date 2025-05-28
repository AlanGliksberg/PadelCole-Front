import { StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  header: {
    marginBottom: spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textBlockLarge: {
    height: 20,
    width: "60%",
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: spacing.xs,
  },
  textBlockSmall: {
    height: 14,
    width: "25%",
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: spacing.xs,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  iconSkeleton: {
    width: 18,
    height: 18,
    backgroundColor: "#e0e0e0",
    borderRadius: 9,
    marginRight: spacing.xs,
  },
  tagSkeleton: {
    height: 20,
    width: 50,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
  },
});

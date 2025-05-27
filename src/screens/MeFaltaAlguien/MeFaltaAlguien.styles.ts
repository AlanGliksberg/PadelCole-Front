import { StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  createMatchText: {
    marginVertical: spacing.sm,
  },
  createMatchButton: {
    alignSelf: "center",
    marginBottom: spacing.xl,
  },
  matchesText: {
    marginBottom: spacing.md,
  },
  list: {
    paddingBottom: spacing.lg,
  },

  loadMore: {
    alignSelf: "center",
    marginVertical: spacing.md,
  },
});

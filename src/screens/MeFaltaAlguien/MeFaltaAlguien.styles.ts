import { StyleSheet } from "react-native";
import { spacing } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
  matchesContainer: {
    height: "85%",
  },
  createMatchText: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
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

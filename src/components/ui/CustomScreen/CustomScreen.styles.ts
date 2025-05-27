import { colors, spacing, typography } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    gap: 6,
  },
  backButton: {
    marginRight: spacing.md,
  },
  backPlaceholder: {
    marginRight: spacing.sm,
  },
  title: {
    flex: 1,
    textAlign: "left",
    color: "#fff",
    fontSize: typography.h3,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

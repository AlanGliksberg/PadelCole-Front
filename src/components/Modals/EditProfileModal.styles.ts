import { colors, spacing, typography } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: spacing.md,
    width: "90%",
    alignSelf: "center",
    maxHeight: "80%",
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.h3,
    fontWeight: "bold",
    color: colors.text,
  },
  closeIcon: {
    color: colors.text,
  },
  scrollView: {
    flexGrow: 0,
  },
  content: {
    flexGrow: 0,
    gap: spacing.sm,
  },
  footer: {
    marginTop: spacing.md,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: typography.body,
  },
});

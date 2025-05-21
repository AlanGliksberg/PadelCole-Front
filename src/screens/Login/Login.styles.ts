import { Platform, StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: typography.h2,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#F2F2F7",
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    fontSize: typography.body,
    color: colors.text,
    ...Platform.select({ android: { paddingVertical: 0 } }),
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    height: 48,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  googleButton: {
    backgroundColor: colors.google,
  },
  buttonText: {
    color: "#fff",
    fontSize: typography.body,
    fontWeight: "600",
  },
  forgotText: {
    color: colors.primary,
    fontSize: typography.small,
    textAlign: "center",
    marginTop: spacing.sm,
  },
});

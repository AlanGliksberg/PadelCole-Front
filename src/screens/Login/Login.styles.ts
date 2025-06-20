import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    elevation: 5,
  },
  title: {
    marginBottom: spacing.lg,
  },
  inputsContainer: {
    gap: 20,
    marginBottom: spacing.lg,
  },
  googleButton: {
    backgroundColor: colors.google,
  },
  forgotText: {
    color: colors.primary,
    fontSize: typography.small,
    textAlign: "center",
    marginTop: spacing.sm,
  },
  buttonContainer: {
    display: "flex",
    gap: spacing.md,
  },
  mainButtonsContainer: {
    display: "flex",
    gap: spacing.sm,
  },
  secondaryButtonsContainer: {
    display: "flex",
    gap: spacing.sm,
  },
});

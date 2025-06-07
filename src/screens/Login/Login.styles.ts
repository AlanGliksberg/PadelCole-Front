import { StyleSheet } from "react-native";
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
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    elevation: 5,
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
    gap: spacing.sm,
  },
});

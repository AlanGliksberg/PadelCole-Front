// src/screens/Register.styles.ts
import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
    marginTop: 90,
  },
  inner: {
    flex: 1,
  },
  content: {
    marginTop: spacing.md,
    width: "100%",
    maxWidth: 400,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    elevation: 5,
    gap: 10,
  },
  title: {
    fontSize: typography.h1,
    color: colors.primary,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
});

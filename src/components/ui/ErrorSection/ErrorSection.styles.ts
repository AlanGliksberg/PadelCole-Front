import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
    gap: 20,
  },
  message: {
    marginTop: spacing.md,
    color: colors.error,
    fontSize: typography.body,
    textAlign: "center",
  },
  button: {
    marginTop: 50,
  },
  buttonText: {
    fontSize: typography.h3,
  },
});

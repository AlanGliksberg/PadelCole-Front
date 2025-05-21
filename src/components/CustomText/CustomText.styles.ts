import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";

export const styles = StyleSheet.create({
  text: {
    color: colors.text,
    fontSize: typography.body,
  },
  title: {
    fontSize: typography.h2,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: typography.small,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});

import { colors, spacing } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.md,
  },
  description: {
    textAlign: "center",
    color: colors.description,
  },
  form: {
    flex: 1,
    gap: spacing.md,
  },
  input: {
    marginBottom: spacing.sm,
  },
  actions: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  buttonText: {
    color: colors.white,
  },
});

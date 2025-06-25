import { colors, spacing } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  label: {
    color: colors.text,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: spacing.sm,
    backgroundColor: colors.input,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  buttonSelected: {
    backgroundColor: colors.primary,
  },
  text: {
    paddingHorizontal: spacing.sm,
    textAlign: "center",
  },
  textSelected: {
    color: colors.white,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.5,
  },
});

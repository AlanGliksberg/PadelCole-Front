// CustomTextInput.styles.ts
import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../../theme";

export const styles = StyleSheet.create({
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 48,
    backgroundColor: colors.input,
    borderRadius: 8,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  leftSide: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  leftSlot: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    height: "100%",
    paddingVertical: 0,
    fontSize: typography.body,
    color: colors.text,
  },
  rightSide: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rightSlot: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: spacing.sm,
  },
});

import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../../theme";

export const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: "row",
    marginBottom: spacing.xs,
  },
  container: {
    width: "100%",
    backgroundColor: colors.input,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    minHeight: 100,
  },
  input: {
    flex: 1,
    fontSize: typography.medium,
    color: colors.text,
    textAlignVertical: "top",
  },
  characterCount: {
    alignSelf: "flex-end",
    marginTop: spacing.xs,
    color: colors.placeholder,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.caption,
    marginLeft: 5,
  },
  errorInput: {
    borderColor: colors.error,
    borderWidth: 1,
  },
});

import { colors, spacing, typography } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    minHeight: "20%",
    maxHeight: "80%",
    backgroundColor: colors.background,
    borderRadius: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    overflow: "hidden",
    display: "flex",
    justifyContent: "space-between",
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: typography.h3,
    textAlign: "center",
    marginRight: spacing.sm,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    right: -5,
    top: -8,
  },
  message: {
    color: colors.text,
    fontSize: typography.body,
    lineHeight: typography.body * 1.4,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
});
